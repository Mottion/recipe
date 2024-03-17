import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';
import { Prisma } from "@prisma/client";
 

JoiSchemaOptions({allowUnknown: false})
export class CreateTagDto {
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  image: string;

  constructor(args: Prisma.TagCreateInput){
    this.name = args.name;
    this.image = args.image;
  }
}
