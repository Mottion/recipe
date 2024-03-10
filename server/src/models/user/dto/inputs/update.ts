import { Prisma } from "@prisma/client";

export class updateUserInput implements Prisma.UserUpdateInput{
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  image?: string | Prisma.NullableStringFieldUpdateOperationsInput;
  password?: string | Prisma.StringFieldUpdateOperationsInput;
  
  constructor(args: Prisma.UserUpdateInput){
    this.name = args.name;
    this.image = args.image;
    this.password = args.password;
  }

  static validate(args: Prisma.UserUpdateInput){
    return true
  }
}