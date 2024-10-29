import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "./notification.repository";
import { createNotificationDto } from "./dto/create-notification.dto";
import { NotificationGateway } from "./notification.gateway";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationGateway: NotificationGateway
  ){}

  async getNotifications(skip: number, userId: string){
    return this.notificationRepository.getNotifications(skip, userId);
  }

  async read(userId: string){
    const response = await this.notificationRepository.read(userId);
    return response;
  }
  
  async create(notifiacation: createNotificationDto, userId: string){
    const response = await this.notificationRepository.createNotification(notifiacation, userId);
    this.notificationGateway.sendNotification(userId, response)
    return response;
  }
}