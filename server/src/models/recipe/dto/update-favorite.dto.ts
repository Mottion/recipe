import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class updateFavoriteDto {
  @JoiSchema(Joi.string().required())
  id: string;
  @JoiSchema(Joi.boolean().required())
  newState: boolean;
  
  constructor(args: updateFavoriteDto) {
    this.id = args.id;
    this.newState = args.newState;
  }
}