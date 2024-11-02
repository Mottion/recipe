import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class RatingRecipeDto {
  @JoiSchema(Joi.string().required())
  id: string;
  @JoiSchema(Joi.number().required())
  stars: number;
}