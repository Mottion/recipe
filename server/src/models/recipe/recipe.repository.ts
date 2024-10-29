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

  async getRecipe(
    recipeId: string,
    requesterId?: string
  ){
    const response = await this.prisma.recipe.findFirst({
      where: {id: recipeId},
      include: {
        ...GetRecipeDto.include.include,
        favoritesBy: {where: {id: requesterId}, select: {id: true}},
      }
    });
    return response;
  }

  async update(
    id: string,
    data: Prisma.RecipeUpdateInput,
    userId?: string
  ){
    const response = await this.prisma.recipe.update({
      where: {id},
      data: data,
      include: {
        ...GetRecipeDto.include.include,
        favoritesBy: {where: {id: userId}, select: {id: true, name: true}},
      }
    });
    return response;
  }

  async getMyFavorites(
    skip: number, 
    take: number,
    userId: string,
  ){
    const response = await this.prisma.recipe.findMany({
      where: {favoritesBy: {some: {id: userId}}},
      skip,
      take,
      ...GetRecipeDto.include
    });
    return response;
  }

}