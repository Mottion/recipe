import { Injectable } from '@nestjs/common';
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

  async getRecipes(page: number | undefined){
    const recipes = await this.recipeRepository.getRecipes(page);
    const response = recipes.map((recipe) => new GetRecipeDto(recipe));
    return response 
  }
}
