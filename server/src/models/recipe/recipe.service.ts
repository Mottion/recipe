import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipeDto } from './dto/get-recipe.dto';

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
    const recipe = await this.recipeRepository.getRecipe(recipeId);
    if(!recipe) throw new NotFoundException("Recipe not found");
    const response = new GetRecipeDto(recipe, userId);
    return response 
  }
}
