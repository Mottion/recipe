import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class updateUserDto implements Prisma.UserUpdateInput{
  @JoiSchema(Joi.string())
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  @JoiSchema(Joi.string().allow(null))
  image?: string | Prisma.NullableStringFieldUpdateOperationsInput;
  @JoiSchema(Joi.string())
  email?: string | Prisma.StringFieldUpdateOperationsInput;

  constructor(args: Prisma.UserUpdateInput){
    this.name = args.name;
    this.image = args.image;
    this.email = args.email;
  }

  static validate(args: Prisma.UserUpdateInput){
    return true
  }
}