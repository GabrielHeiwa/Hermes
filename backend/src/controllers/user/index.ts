import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { generateTokensJwt } from "../../utils/jwt";
import { encryptPassword, compareBcryptPasswords, encryptPasswordBcrypt } from "../../utils/token";

class UserController {
  constructor() {}

  async login(req: Request, res: Response) {
    try {
      let { password, email } = req.body;
      password = encryptPassword(password, email);

      const user = await prisma.user.findFirst({
        where: { email, password },
      });

      if (!user) return res.status(401).json({ message: "Usuário não autenticado" });

      const token = generateTokensJwt({
        "X-Hasura-User-Id": user.id,
        "X-Hasura-Role": "admin"
      })

      return res.status(200).json({ message: "Usuário logado com sucesso", token });
    } catch (error) {
      console.log({ error });
      return res.status(400).json({ message: "Erro ao realizar o login do usuário", error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const user = {
        password: encryptPassword(data.password, data.email),
        email: data.email,
      };

      await prisma.user.create({ data: user });

      return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao registrar o novo usuário" });
    }
  }

  async loginBcrypt(req: Request, res: Response) {
    try {
      let { password, email } = req.body;
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) return res.status(401).json({ message: "Usuário não autenticado" });

      const valid = compareBcryptPasswords(password, user.password);

      if (!valid) return res.status(401).json({ message: "Usuário não autenticado" });

      return res.status(200).json({ message: "Usuário logado com sucesso" });
    } catch (error) {
      console.log({ error });
      return res.status(400).json({ message: "Erro ao realizar o login do usuário", error });
    }
  }

  async registerBcrypt(req: Request, res: Response) {
    try {
      const data = req.body;

      const user = {
        password: encryptPasswordBcrypt(data.password),
        email: data.email,
      };

     

      await prisma.user.create({ data: user });

      return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Erro ao registrar o novo usuário" });
    }
  }
}

export { UserController };
