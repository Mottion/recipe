import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Request } from "express";
import { createNotificationDto } from "./dto/create-notification.dto";

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ){}

  @Post()
  async create(@Req() req: Request, @Body() notifiacation: createNotificationDto) {
    return this.notificationService.create(notifiacation, req["user"].id);
  }

  @Get()
  async getNotifications(@Param() params: {skip: number}, @Req() req: Request) {
    return this.notificationService.getNotifications(params.skip ?? 0, req["user"].id);
  }
}