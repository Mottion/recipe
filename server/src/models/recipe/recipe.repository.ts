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

  async getRecipes(skip: number, take: number, userId?: string){
    const response = await this.prisma.recipe.findMany({
      where: {owner: {id: userId}},
      skip,
      take,
      ...GetRecipeDto.include
    });
    return response;
  }

  async getRecipe(recipeId: string){
    const response = await this.prisma.recipe.findFirst({
      where: {id: recipeId},
      ...GetRecipeDto.include
    });
    return response;
  }
}