import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class messageCreateDto {
  @JoiSchema(Joi.string().required())
  text: string;
  @JoiSchema(Joi.string().required())
  receiver: string;

  constructor(args: messageCreateDto){
    this.text = args.text
    this.receiver = args.receiver
  }
}