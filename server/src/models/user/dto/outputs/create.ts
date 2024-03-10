import { Prisma } from "@prisma/client";
import { createUserInput } from "../inputs/create";

export class createUserOutput implements Omit<createUserInput, "password"> {
  name: string;
  image: string | null;
  email: string;
  
  constructor(args: Prisma.UserCreateInput) {
    this.name = args.name;
    this.image = args.image;
    this.email = args.email;
  }

  static validate(args: Prisma.UserCreateInput){
    return true;
  }
}