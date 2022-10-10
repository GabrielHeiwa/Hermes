import { Request, Response } from "express";
import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";
import server from "../../server";

class ManagerController {
  constructor() {}

  newPhone() {
    const c = new Client({});

    c.initialize();

    c.on("qrcode", (qr) => console.log(qr));
  }

  newMessage(req: Request, res: Response) {
    const { messages } = req.body;
  }
}

export { ManagerController };
