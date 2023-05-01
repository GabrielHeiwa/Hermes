import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { prisma } from "../database/connection";
import { WwClient } from "../repositories/ww-client";

const CREATE_MESSENGER_OBRIGATORY_FIELDS = [
	"daysOfWeek",
	"end",
	"start",
	"message",
	"phone",
	"numbersToSend",
	"title",
	"userId",
];

interface CreateMessengerRequestBodyType {
	title: string;
	daysOfWeek: { label: string; value: string }[];
	end: string;
	start: string;
	message: { label: string; value: string };
	phone: { label: string; value: string };
	numbersToSend: string[];
	userId: string;
}

class MessengerController {
	async create(
		req: Request<any, any, CreateMessengerRequestBodyType>,
		res: Response
	) {
		const BODY_KEYS = Object.keys(req.body);
		if (
			!CREATE_MESSENGER_OBRIGATORY_FIELDS.every((field) =>
				BODY_KEYS.includes(field)
			)
		)
			return res.status(400).json({
				message: "Campos obrigatórios faltando",
			});

		const {
			title,
			daysOfWeek,
			end,
			start,
			message,
			phone,
			numbersToSend,
			userId,
		} = req.body;

		const messengerId = randomUUID();
		await prisma.messenger.create({
			data: {
				days_running: daysOfWeek
					.map((day) => day.value)
					.join(","),
				hour_end: end,
				hour_start: start,
				title,
				id: messengerId,
				message_group_id_fk: message.value,
				phone_id_fk: phone.value,
				userId,
			},
		});

		const phoneNumbersGroupId = randomUUID();
		await prisma.phoneNumbersGroup.create({
			data: {
				id: phoneNumbersGroupId,
				messenger_id_fk: messengerId,
			},
		});

		const dataPhones: Prisma.PhonesCreateManyInput[] = [];
		for (const phone of numbersToSend) {
			dataPhones.push({
				phone_number: phone,
				messenger_id: messengerId,
				id: randomUUID(),
			});
		}

		await prisma.phones.createMany({
			data: dataPhones,
		});

		res.status(201).json({
			message: "Mensageiro configurado com sucesso",
		});
	}

	async start(req: Request, res: Response) {
		const { messengerId } = req.params;
		const wwClient = new WwClient(messengerId);
		await wwClient.start(res);
	}

	async stop(req: Request, res: Response) {
		const { messengerId } = req.params;
		const wwClient = new WwClient(messengerId);
		await wwClient.stop(res);
	}

	async remove(req: Request, res: Response) {
		res.send("ok");
	}

	async edit(req: Request, res: Response) {
		res.send("ok");
	}
}

export { MessengerController };
