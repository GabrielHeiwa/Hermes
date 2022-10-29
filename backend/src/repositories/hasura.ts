import { randomUUID } from "crypto";
import { INSERT_REFRESH_TOKEN } from "../queries/refreshToken";
import { hasuraDirectRequest } from "../services/hasura";

class HasuraRepository {
	async insertRefreshToken(userId: string, refreshToken: string) {
		try {
			const data = {
				id: randomUUID(),
				user_id: userId,
				refresh_token: refreshToken,
			};

			await hasuraDirectRequest({
				query: INSERT_REFRESH_TOKEN,
				variables: { refreshToken: data },
			});
		} catch (err: any) {
			const errMessage =
				err.message ||
				err.response?.data.message ||
				"Houve um erro ao inserir o refreshToken";

			throw new Error(errMessage);
		}
	}
}

export { HasuraRepository };
