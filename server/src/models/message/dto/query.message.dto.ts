import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';
import { Recipe } from "@prisma/client";

@JoiSchemaOptions({allowUnknown: false})
export class QueryMessageDto {
  @JoiSchema(Joi.number().required())
  skip: number;
}