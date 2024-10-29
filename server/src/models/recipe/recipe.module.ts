import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { PrismaService } from 'src/prisma.service';
import { RecipeRepository } from './recipe.repository';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, RecipeRepository],
  imports: [NotificationModule]
})
export class RecipeModule {}
