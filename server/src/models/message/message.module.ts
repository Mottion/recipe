import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/gateways/socket.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, PrismaService, SocketGateway],
})
export class MessageModule {}
