import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';
import { Recipe } from "@prisma/client";

@JoiSchemaOptions({allowUnknown: false})
export class CreateRecipeDto {
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

  constructor(args: Recipe){
    this.tagId = args.tagId;
    this.name = args.name;
    this.description = args.description;
    this.ingredients = args.ingredients;
    this.image = args.image;
    this.methodOfPreparation = args.methodOfPreparation;
    this.kcal = args.kcal;
  }
}