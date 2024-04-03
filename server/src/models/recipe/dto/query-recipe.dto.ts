import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';
import { Recipe } from "@prisma/client";

@JoiSchemaOptions({allowUnknown: false})
export class QueryRecipeDto {
  @JoiSchema(Joi.number().required())
  skip: number;
  @JoiSchema(Joi.number().required())
  take: number;
}