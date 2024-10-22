import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { pathId } from 'src/utils/dtos/path-id';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { updateFavoriteDto } from './dto/update-favorite.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() body: CreateRecipeDto, @Req() req: Request){
    return await this.recipeService.create(body, req)
  }

  @Patch("/favorite")
  async updateFavorite(@Body() body: updateFavoriteDto, @Req() req: Request){
    return await this.recipeService.updateFavorite(req["user"].id, body)
  }

  @Get()
  async getRecipes(@Query() query: QueryRecipeDto){
    return await this.recipeService.getRecipes(+query.skip, +query.take);
  }

  @Get("/user/:id")
  async getUserRecipes(@Param() params: pathId, @Query() query: QueryRecipeDto){
    return await this.recipeService.getRecipes(+query.skip, +query.take, params.id);
  }

  @Get("/user")
  async getMyRecipes(@Req() req: Request, @Query() query: QueryRecipeDto){
    return await this.recipeService.getRecipes(+query.skip, +query.take, req["user"].id);
  }

  @Get("/favorites")
  async getMyFavorites(@Req() req: Request, @Query() query: QueryRecipeDto){
    return await this.recipeService.getMyFavorites(+query.skip, +query.take, req["user"].id)
  }

  @Get("/:id")
  async getRecipe(@Req() req: Request, @Param() params: pathId){
    return await this.recipeService.getRecipe(req["user"].id, params.id);
  }
  
}
