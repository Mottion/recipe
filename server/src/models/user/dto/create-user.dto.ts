import { Prisma } from "@prisma/client";

export class createUserDto implements Prisma.UserCreateInput {
  name: string;
  email: string;
  image: string | null;
  password: string;
  
  constructor(args: Prisma.UserCreateInput) {
    this.name = args.name;
    this.image = args.image;
    this.email = args.email;
    this.password = args.password;
  }

  static validate(args: Prisma.UserCreateInput){
    return true;
  }
}