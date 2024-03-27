import { Prisma, Rating, Recipe } from '@prisma/client';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({allowUnknown: false})
export class GetRecipeDto {
  @JoiSchema(Joi.string().required())
  id: string;
  @JoiSchema(Joi.string().required())
  tagId: string;
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  description: string;
  @JoiSchema(Joi.array().items(Joi.string()).required())
  ingredients: Array<string>;
  @JoiSchema(Joi.string().required())
  image: string;
  @JoiSchema(Joi.string().required())
  methodOfPreparation: string;
  @JoiSchema(Joi.number().required())
  kcal: number;
  @JoiSchema(Joi.number().required())
  rating: number;

  constructor(args: Prisma.RecipeGetPayload<{include: {ratings: true}}>){
    this.id = args.id;
    this.tagId = args.tagId;
    this.name = args.name;
    this.description = args.description;
    this.ingredients = args.ingredients;
    this.image = args.image;
    this.methodOfPreparation = args.methodOfPreparation;
    this.kcal = args.kcal;
    if(args.ratings.length == 0){
      this.rating = 0;
    } else {
      let stars = args.ratings.map((value) => { return value.stars});
      this.rating = stars.reduce((star, next) => star + next) / args.ratings.length;
    }
  }
}