import { Prisma, Rating, Recipe } from '@prisma/client';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

const include = {include: {ratings: true, owner: {select: {id: true, name: true}}, tag: {select: {name: true}}}};
@JoiSchemaOptions({allowUnknown: false})
export class GetRecipeDto {
  @JoiSchema(Joi.string().required())
  id: string;
  @JoiSchema(Joi.string().required())
  tag: string;
  @JoiSchema(Joi.string().required())
  author: string;
  @JoiSchema(Joi.string().required())
  authorId: string;
  @JoiSchema(Joi.boolean())
  isOwner?: boolean;
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

  
  static include = include;
  constructor(args: Prisma.RecipeGetPayload<typeof include>, userId?: string){
    this.id = args.id;
    this.tag = args.tag.name;
    this.author = args.owner.name;
    this.authorId = args.owner.id;
    this.name = args.name;
    this.description = args.description;
    this.ingredients = args.ingredients;
    this.image = args.image;
    this.methodOfPreparation = args.methodOfPreparation;
    this.kcal = args.kcal;

    if(userId){
      this.isOwner = userId == args.owner.id ? true : false;
    }

    if(args.ratings.length == 0){
      this.rating = 0;
    } else {
      let stars = args.ratings.map((value) => { return value.stars});
      this.rating = stars.reduce((star, next) => star + next) / args.ratings.length;
    }
  }
}