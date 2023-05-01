

import { prisma } from "../database/connection";
import { Client, LocalAuth } from "whatsapp-web.js";
import cron from "node-cron";
import type { Response } from "express";

interface MapValue {
    client: Client;
    session: string;
}

const clients: Map<string, MapValue> = new Map();

class WwClient {

    private phones: string[] = [];
    private phonePosition: number = 0;
    private client: Client = new Client({});
    private messengerId: string = "";
    private session: string = "";

    constructor(messengerId: string) {
        const value = clients.get(messengerId);
        if (value === undefined) {
            this.messengerId = messengerId;
            this.createClient();
        } else {
            this.client = value.client;
            this.session = value.session;
        }
    };

    public async start(res: Response) {
        try {
            const messengerConfig = await prisma.messenger.findUnique({
                where: {
                    id: this.messengerId
                },
                select: {
                    message_group: {
                        select: {
                            messages: true
                        }
                    },
                    Phones: {
                        where: {
                            already_send: false,
                        },
                        select: {
                            phone_number: true
                        }
                    }
                }
            });

            this.client.initialize()
                .then(() => {
                    console.log("Client has been initialize");
                })
                .catch((err) => {
                    console.log(err);
                });

            let pos = 0;
            const phones = messengerConfig?.Phones.map(p => p.phone_number);
            if (phones === undefined) return;

            const cronJob = cron.schedule("*/5 * * * * *", async () => {
                if (pos === phones.length) {
                    await this.client.destroy();
                    cronJob.stop();

                    return;
                }

                const phone = phones[pos];
                const chatId = phone + "@c.us";
                const content = messengerConfig?.message_group.messages[0].message ?? "";
                await this.client.sendMessage(chatId, content, {});
                console.log(`Client: ${this.session} send message for -> ${chatId}\n${pos + 1}/${phones.length}`);
                pos++;
            }, {
                name: this.session,
                runOnInit: false,

            });

            this.client.on("ready", async () => {
                console.log("Client ready to send messages");
                cronJob.start();

                return res.status(200).json({
                    message: "Messenger has been start"
                });
            });

            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    public async stop(res: Response) {
        try {
            const cronMap = cron.getTasks();
            const task = cronMap.get(this.session);

            if (task === undefined) throw new Error("CronJob not found!");

            task.stop();
            await this.client.destroy();

            res.status(200).json({
                message: "Messenger stoped with success"
            });

            return;
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: "Error has been stop messenger"
            });
        }
    }

    private async createClient() {
        await this.getSession();

        this.client = new Client({
            authStrategy: new LocalAuth({ clientId: this.session }),
            puppeteer: { headless: false }
        });

        clients.set(this.messengerId, {
            client: this.client,
            session: this.session
        });

        return;
    }

    private async getSession() {
        const messengerConfig = await prisma.messenger.findUnique({
            where: {
                id: this.messengerId
            },
            select: {
                phone: {
                    select: {
                        session: true
                    }
                }
            }
        });

        const session = messengerConfig?.phone.session;
        if (!session) throw new Error("Session of client not found!");

        this.session = session;
    }
}

export { WwClient }
