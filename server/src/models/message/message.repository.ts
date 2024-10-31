import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { messageCreateDto } from './dto/message-create.dto';

@Injectable()
export class MessageRepository {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(
    message: messageCreateDto, 
    userId: string
  ){
    const response = await this.prisma.message.create({
      data: {
        text: message.text,
        senderId: userId,
        receiverId: message.receiver
      },
      include: {sender: {select: {name: true, image: true}}}
    });
    return response;
  }

  async read(
    requesterUser: string, 
    targetUser: string
  ){
    const response = await this.prisma.message.updateMany({
      where: {receiverId: requesterUser, senderId: targetUser, readed: false},
      data: {readed: true}
    });
    return response;
  }

  async getUserMessages(
    requesterUser: string, 
    targetUser: string,
    skip: number
  ){
    const response = await this.prisma.message.findMany({
      where: {OR: [
        {receiverId: targetUser, senderId: requesterUser},
        {receiverId: requesterUser, senderId: targetUser},
      ]},
      skip: 20 * skip
    });
    return response;
  }

  async getMessages(
    userId: string
  ){
    const response = await this.prisma.message.findMany({
      where: {
        receiverId: userId
      },
      distinct: ["senderId"],
      orderBy: {createdAt: "desc"},
      include: {
        sender: {select: {name: true, image: true}}
      }
    });
    return response;
  }
}
