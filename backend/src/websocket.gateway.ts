import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ManagerService } from './manager/manager.service';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: Socket) {
    console.log(`Client: ${client.id} has been disconnected`);
    // throw new Error('Method not implemented.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client has been connected: ${client.id}`);
    // throw new Error('Method not implemented.');
  }

  afterInit(server: any) {
    console.log('Websocket server running');
    // throw new Error('Method not implemented.');
  }

  @WebSocketServer()
  server: Server;

  constructor(private managerService: ManagerService) {}

  @SubscribeMessage('qrcode')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(this.server.to(client.id).local);

    this.managerService.registerAccount(client);
    return 'teste2';
  }
}
