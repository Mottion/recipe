import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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
  async getRecipes(@Param() params: {page: number | undefined}){
    return await this.recipeService.getRecipes(params.page ?? 0);
  }
}
