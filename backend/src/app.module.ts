import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { WebsocketGateway } from './websocket.gateway';
import { ManagerService } from './manager/manager.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, WebsocketGateway, ManagerService],
})
export class AppModule {}
