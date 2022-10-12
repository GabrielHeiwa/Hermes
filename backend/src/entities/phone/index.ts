import { randomUUID } from "crypto";
import type { ClientSession } from "whatsapp-web.js";
import { prisma } from "../../database/connection";

export interface PhoneProps {
  id?: string;
  phoneNumber: string;
  description?: string;
  userId: string;
  session: ClientSession;
}

class Phone {
  private id?: string | undefined;
  private phoneNumber: string;
  private description?: string | undefined;
  private userId: string;
  private session: ClientSession;

  constructor(props: PhoneProps) {
    if (!props.id) this.id = randomUUID();

    Object.assign(this, props);
    this.setSession(props.session);
  }

  // Methods
  async save() {
    try {
      await prisma.phone.create({
        data: {
          phoneNumber: this.getPhoneNumber(),
          description: this.getDescription(),
          userId: this.getUserId(),
          session: JSON.stringify(this.getSession()),
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

  // Getters and setters
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

  getSession() {
    return this.session;
  }

  setSession(_session: ClientSession) {
    this.session = _session;

    return;
  }
}

export { Phone };
