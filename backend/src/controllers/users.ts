import { Request, Response } from "express";
import { prisma } from "../database/connection";
import { HasuraRepository } from "../repositories/hasura";
import { generateTokensJwt } from "../utils/jwt";
import { compareBcryptPasswords, encryptPasswordBcrypt } from "../utils/token";

const hasuraRepository = new HasuraRepository();

class UserController {
	async login(req: Request, res: Response) {
		try {
			let { password, email } = req.body;
			const user = await prisma.user.findFirst({
				where: { email },
			});

			if (!user) throw new Error("Usuário não autenticado");

			const valid = compareBcryptPasswords(
				password,
				user.password
			);

			if (!valid) throw new Error("Usuário não autenticado");

			const payload = {
				"X-Hasura-User-Id": user.id,
				"X-Hasura-Role": "user",
			};

			const { accessToken, refreshToken } =
				generateTokensJwt(payload);

			await hasuraRepository.insertRefreshToken(
				user.id,
				refreshToken
			);

			return res.status(200).json({
				message: "Usuário logado com sucesso",
				refreshToken,
				accessToken,
			});
		} catch (err: any) {
			console.log({ err });
			const errMessage =
				err.message ||
				err.response?.data.message ||
				"Houve um erro ao realizar o login";

			return res.status(401).json({
				message: errMessage,
				err,
			});
		}
	}

	async register(req: Request, res: Response) {
		try {
			const data = req.body;

			const user = {
				password: encryptPasswordBcrypt(data.password),
				email: data.email,
			};

			await prisma.user.create({ data: user });

			return res.status(201).json({
				message: "Usuário registrado com sucesso",
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				message: "Erro ao registrar o novo usuário",
			});
		}
	}
}

export { UserController };
