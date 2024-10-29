import { Prisma } from "@prisma/client";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class createNotificationDto {
  @JoiSchema(Joi.string().required())
  title: string;
  @JoiSchema(Joi.string().required())
  description: string;
  
  constructor(args: Prisma.NotificationCreateInput) {
    this.title = args.title;
    this.description = args.description;

  }
}