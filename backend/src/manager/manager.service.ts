import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Client } from 'whatsapp-web.js';

@Injectable()
export class ManagerService {
  registerAccount(socket: Socket) {
    const client = new Client({ puppeteer: { headless: false } });

    client.initialize();

    client.on('authenticated', () => client.destroy());
    return client.on('qr', (qr) => qr);
  }
}
