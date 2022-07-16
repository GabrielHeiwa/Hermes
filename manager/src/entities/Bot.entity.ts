import { Client, LocalAuth } from "whatsapp-web.js";
import { CronJob } from "cron";

class Bot {
  private client: Client | null = null;
  private message: string = "oie";
  private numbers: string[] = [
    "554784288351",
    "554784288351",
    "554784288351",
    "554784288351",
    "554784288351",
  ];
  private actualNumber: number = 0;
  private cronTime: string | null = "* * * * *";
  private cronJob: CronJob | null = null;

  constructor(private clientId: string) {
    this.clientId = clientId;
  }

  async start() {
    // Get all data of database
    // Get numbers

    // Get message

    // Get interval

    // Create client
    this.client = new Client({
      puppeteer: { headless: false },
      authStrategy: new LocalAuth({ clientId: this.clientId }),
    });

    // Start client
    await this.client?.initialize()
        .catch(error => console.log({
            message: 'Target closed',
            error
        }));

    // Set cron job to run send function
    if (this.cronTime === null) throw new Error("Cron time is not be null");
    this.cronJob = new CronJob(
      this.cronTime,
      () => this.send(),
      null,
      true,
      "America/Sao_Paulo"
    );
  }

  stop() {
    console.log({ message: "Stop cron job of send messages" });

    this.cronJob?.stop();
    this.client?.destroy();

    return;
  }

  send() {
    const chatId = this.numbers[this.actualNumber] + "@c.us";

    console.log({
      ev: "send message",
      chatId,
      message: this.message,
    });

    if (this.actualNumber >= this.numbers.length) return this.stop();

    this.client?.sendMessage(chatId, this.message);
    this.actualNumber += 1;

    return;
  }

  
}

export { Bot };
