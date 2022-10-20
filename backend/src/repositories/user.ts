
import { prisma } from "../database/connection";
import { User } from "../entities/user";

class UserRepository {
	constructor() {}

	public async save(user: User) {
		try {
			await prisma.user.create({
				data: {
					email: user.email,
					password: user.password,
					id: user.id,
				},
			});
		} catch (error) {
			console.error({ error });

			return {
				message: "Erro ao inserir o usuário no banco de dados",
				status: 400,
			};
		}
	}

    
}

export { UserRepository };