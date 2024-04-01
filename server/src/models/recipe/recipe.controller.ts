import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() body: CreateRecipeDto, @Req() req: Request){
    return await this.recipeService.create(body, req)
  }

  @Get()
  async getRecipes(@Query() query: {skip: number, take: number}){
    return await this.recipeService.getRecipes(+query.skip, +query.take);
  }
}
