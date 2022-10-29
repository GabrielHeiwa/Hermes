import axios, { AxiosResponse } from "axios";
import { print } from "graphql";

const hasuraAxios = axios.create({
	baseURL: process.env.HASURA_HTTP_URL,
	headers: { "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET },
});

interface hasuraResponse<T> {
	errors?: {
		message: string;
	}[];
	data: T;
}

async function hasuraDirectRequest<T>({ query, variables }) {
	try {
		const { data } = await hasuraAxios.post<
			any,
			AxiosResponse<hasuraResponse<T>>
		>("/v1/graphql", {
			query: print(query),
			variables,
		});

		if (data.errors)
			throw new Error(
				data?.errors
					.map((error) => error.message)
					.join("\n")
			);

		return data;
	} catch (err: any) {
		const errMessage =
			err.message ||
			err.response?.data.message ||
			"Houve um erro na requisição do hasura";

		throw new Error(errMessage);
	}
}

export { hasuraDirectRequest };
