import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';
import { updateFavoriteDto } from './dto/update-favorite.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
  ){}

  async create(recipe: CreateRecipeDto, req: Request){
    const response = await this.recipeRepository.create({...recipe, ownerId: req["user"].id });
    return response;
  }

  async getRecipes(skip: number | undefined, take: number | undefined, userId?: string){
    const recipes = await this.recipeRepository.getRecipes(skip, take, userId);
    const response = recipes.map((recipe) => new GetRecipeDto(recipe));
    return response 
  }

  async getRecipe(userId: string, recipeId: string){
    const {favoritesBy, ...recipe} = await this.recipeRepository.getRecipe(recipeId, userId);
    if(!recipe) throw new NotFoundException("Recipe not found");
    const response = new GetRecipeDto(recipe, userId);
    const isFavorite = favoritesBy.length > 0 ? true : false;
    return {...response, isFavorite}
  }

  async updateFavorite(userId: string, body: updateFavoriteDto){
    let query: Prisma.RecipeUpdateInput = {};

    if(body.newState){
      query = {favoritesBy: {connect: {id: userId}}};
    }else{
      query = {favoritesBy: {disconnect: {id: userId}}};
    }

    const {favoritesBy, ...recipe} = await this.recipeRepository.update(body.id, query, userId);
    const isFavorite = favoritesBy.length > 0 ? true : false;
    const response = new GetRecipeDto(recipe, userId);
    return {...response, isFavorite}
  }

  async getMyFavorites(skip: number | undefined, take: number | undefined, userId: string){
    const recipes = await this.recipeRepository.getMyFavorites(skip, take, userId);
    const response = recipes.map((recipe) => new GetRecipeDto(recipe));
    return response;
  }
}
