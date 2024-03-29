import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { GetRecipeDto } from "./dto/get-recipe.dto";

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

  async getRecipes(page: number | undefined){
    const take = 20;
    const response = await this.prisma.recipe.findMany({
      skip: page * take,
      take,
      ...GetRecipeDto.include
    });
    return response;
  }
}