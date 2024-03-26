import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { PrismaService } from 'src/prisma.service';
import { RecipeRepository } from './recipe.repository';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, RecipeRepository],
})
export class RecipeModule {}
