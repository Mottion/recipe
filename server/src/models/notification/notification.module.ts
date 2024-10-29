import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { NotificationGateway } from './notification.gateway';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, NotificationRepository, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
