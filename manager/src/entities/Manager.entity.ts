import { Bot } from "./Bot.entity";

interface Bots {
  id: string;
  client: Bot;
}

class Manager {
  constructor(private clients: Bots[] = []) {}

  async create(id: string) {
    console.log({ message: "create a new Bot", id });

    this.clients.push({
      id,
      client: new Bot(id),
    });

    return;
  }

  async remove(id: string) {
    this.stop(id);
    this.clients = this.clients.filter((client) => client.id === id);

    return;
  }

  async stop(id: string) {
    console.log({ message: "Stop Bot", id });

    this.clients.find((client) => client.id === id)?.client.stop();

    return;
  }

  async start(id: string) {
    console.log({ message: "Start Bot", id });

    this.clients.find((client) => client.id === id)?.client.start();

    return;
  }
}

export { Manager };
