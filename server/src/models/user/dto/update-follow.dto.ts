import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from 'joi';

@JoiSchemaOptions({allowUnknown: false})
export class updateFollowDto {
  @JoiSchema(Joi.string().required())
  id: string;
  @JoiSchema(Joi.boolean().required())
  newState: boolean;
  
  constructor(args: updateFollowDto) {
    this.id = args.id;
    this.newState = args.newState;
  }
}