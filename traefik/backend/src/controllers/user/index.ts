import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { encryptPassword } from "../../utils/jwt";

class UserController {
  constructor() {}

  async login(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const user = await prisma.user.findFirst({
        where: { email, password: encryptPassword(password) },
      });

      if (!user) return res.status(401).json({ message: "Usuário não autenticado" });

      return res.status(200).json({ message: "Usuário logado com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao realizar o login do usuário" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      data.password = encryptPassword(data.password);

      await prisma.user.create({ data });

      return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao registrar o novo usuário" });
    }
  }
}

export { UserController };
