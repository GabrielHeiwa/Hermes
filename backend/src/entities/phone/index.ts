import { randomUUID } from "crypto";
import { prisma } from "../../database/connection";

export interface PhoneProps {
  id?: string;
  phoneNumber: string;
  description?: string;
  userId: string;
}

class Phone {
  private id?: string | undefined;
  private phoneNumber: string;
  private description?: string | undefined;
  private userId: string;

  constructor(props: PhoneProps) {
    if (!props.id) this.id = randomUUID();

    Object.assign(this, props);
  }

  async save() {
    try {
      await prisma.phone.create({
        data: {
          phoneNumber: this.getPhoneNumber(),
          description: this.getDescription(),
          userId: this.getUserId(),
        },
      });

      return {
        message: "Número de telefone adicionado com sucesso",
        status: 201,
      };
    } catch (err: any) {
      return {
        message: "Erro ao adicionar o número de telefone no banco de dados",
        status: 400,
      };
    }
  }

  getId() {
    return this.id;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getDescription() {
    return this.description;
  }

  getUserId() {
    return this.userId;
  }
}

export { Phone };
