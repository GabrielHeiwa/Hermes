import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenController = {
	renewAccessToken(req: Request, res: Response) {
		const { userId } = req.body;

		return res.status(200).json({ userId });
	},
	validateAccessToken(req: Request, res: Response) {
		return res.status(200).send("Ok");
	},
};

async function middlewareValidateAccessToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const accessToken = req.headers.authorization?.replace(
			"Bearer ",
			""
		);
		if (!accessToken) throw new Error("Token de acesso faltando");

		const verify = jwt.verify(accessToken, process.env.JWT_SECRET!);

		req.body = { userId: verify["X-Hasura-User-Id"] };

		return next();
	} catch (err: any) {
		const errMessage =
			err.message ||
			err.response?.data.message ||
			"Houve um erro ao validar o token de acesso";

		return res.status(401).json({
			message: errMessage,
			err,
		});
	}
}

const accessTokenRouter = Router();

// Middlewares
accessTokenRouter.use(middlewareValidateAccessToken);

// Routes
accessTokenRouter.post(
	"/renew-access-token",
	accessTokenController.renewAccessToken
);

accessTokenRouter.get(
	"/validate-access-token",
	accessTokenController.validateAccessToken
);

export { accessTokenRouter };
