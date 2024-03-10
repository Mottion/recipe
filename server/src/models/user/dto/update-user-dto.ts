import { Prisma } from "@prisma/client";

export class updateUserDto implements Prisma.UserUpdateInput{
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  image?: string | Prisma.NullableStringFieldUpdateOperationsInput;
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