import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { createNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async getNotifications(
    skip: number,
    userId: string
  ){
    const response = this.prisma.notification.findMany({
      where: {user_id: userId},
      take: 20,
      skip: 20 * skip,
      orderBy: {createAt: "desc"}
    })
    return response;
  }


  async read(
    userId: string
  ){
    const response = this.prisma.notification.updateMany({
      where: {user_id: userId, readed: false},
      data: {readed: true},
    })
    return response;
  }

  async createNotification(
    data: createNotificationDto,
    userId: string
  ){
    const response = this.prisma.notification.create({
      data: {...data, user: {connect: {id: userId}}}
    })
    return response;
  }
}