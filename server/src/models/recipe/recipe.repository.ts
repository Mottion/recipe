import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RecipeRepository {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(
    data: Prisma.RecipeCreateManyInput,
  ){
    const response = await this.prisma.recipe.create({data});
    return response;
  }
}