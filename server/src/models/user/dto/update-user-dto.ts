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
  newPassword?: string | Prisma.StringFieldUpdateOperationsInput;
  @JoiSchema(Joi.string())
  passwordConfirm?: string | Prisma.StringFieldUpdateOperationsInput;

  constructor(args: Prisma.UserUpdateInput){
    this.name = args.name;
    this.image = args.image;
    // não há retorno de password por motivos de segurança
  }
}