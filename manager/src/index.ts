import { Manager } from "./entities/Manager.entity";
import { Server } from "socket.io";
import prisma from "./prisma";

const io = new Server({ /* options */ });
const man = new Manager();

io.on("connection", async (socket) => {
  try {
    const userId = socket.handshake.auth.userId

    const user = await prisma.users.findUnique({ where: { id: userId }})
    if (!user) throw Error('User is not authenticated')

    socket.on('disconnect', () => man.stop(userId))

  } catch (error) {
    console.error({
      message: 'Erro ao consultar o usuário',
      error
    })
  }

  socket.on('command', ({ userId, command }: CommandEvent) => {
    const commands = {
      START: () => man.start(userId),
      STOP: () => man.stop(userId),
      CREATE: () => man.create(userId),
      REMOVE: () => man.remove(userId)
    }

    commands[command]()
  })
 
});


io.listen(3000);


interface CommandEvent {
  userId: string;
  command: "START" | "STOP" | "CREATE" | "REMOVE"
}