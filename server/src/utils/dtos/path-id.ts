import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class pathId {
  @JoiSchema(Joi.string().required())
  id: string

  constructor(args: {id: string}) {
    this.id = args.id;
  }
}