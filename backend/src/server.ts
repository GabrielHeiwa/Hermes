import express from "express";
import http from "http";
import { router } from "./routes";
import { Server } from "socket.io";
import { Client } from "whatsapp-web.js";
import morgan from "morgan";
import cors from "cors";
import { Phone, PhoneProps } from "./entities/phone";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  console.log(`Socket: ${socket.id} has been connected!`);

  socket.on("disconnect", (reason) =>
    console.log(`Socket: ${socket.id} has been disconnected by ${reason}`)
  );

  socket.on("new-phone-number", (payload: PhoneProps) => {
    const client = new Client({ puppeteer: { headless: false } });

    client.initialize().catch((_) => {
      client.destroy();
      io.to(socket.id).emit("new-phone-number-status", false);

      return;
    });

    client.on("qr", (qr) => io.to(socket.id).emit("qrcode", qr));

    client.on("authenticated", (session) => {
      try {
        if (!session) throw new Error("Arquivo de sessão indefinido");

        const phone = new Phone({ ...payload, session });
        phone.save();
        io.to(socket.id).emit("new-phone-number-status", true);
      } catch (err: any) {
        io.to(socket.id).emit("new-phone-number-status", false);
      }
    });

    client.on("auth_failure", () => io.to(socket.id).emit("new-phone-number-status", false));

    return;
  });
});

export { server, io };
