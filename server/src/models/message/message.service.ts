import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { messageCreateDto } from './dto/message-create.dto';
import { SocketGateway } from 'src/gateways/socket.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly socketGateway: SocketGateway
  ){}

  async create(message: messageCreateDto, userId: string){
    const response = await this.messageRepository.create(message, userId);
    this.socketGateway.sendMessage(message.receiver, response);
    return response;
  }

  async getMessages(userId: string){
    return this.messageRepository.getMessages(userId);
  }

  async read(requesterUser: string, targetUser: string){
    return this.messageRepository.read(requesterUser, targetUser);
  }

  async getUserMessages(requesterUser: string, targetUser: string, skip: number){
    return this.messageRepository.getUserMessages(requesterUser, targetUser, skip);
  }
  
}
