// src/chat.gateway.ts
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { env } from 'process';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/', cors: '*' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(SocketGateway.name);
  private jwtService: JwtService = new JwtService()

  private clients: {[id: string] : Socket} = {};

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const index = Object.values(this.clients).findIndex(item => item.id === client.id);
    delete this.clients[index]
  }

  sendNotification(userId: string, notification: Prisma.NotificationGetPayload<true>) {
    const client = this.clients[userId];
    if(!client) return;

    client.emit("notification", notification);
  }

  sendMessage(userId: string, message: Prisma.MessageGetPayload<{include: {sender: {select: {name: true, image: true}}}}>){
    const client = this.clients[userId];
    console.log("🚀 ~ SocketGateway ~ sendMessage ~ client:", client.id)
    if(!client) return;

    client.emit("message", message);
  }

  @SubscribeMessage("register")
  async subscribeMessage(client: Socket, data: any){
    if(!data?.token){
      this.logger.error(`Client NOT registered: ${client.id}`);
      client.disconnect();
    }

    const user = await this.jwtService.verifyAsync(
      data.token,
      {secret: env.JWT_SECRET_CONSTANT}
    );
    this.clients[user.id] = client;

    this.logger.log(`Client registered: ${client.id}`);
  }
}
