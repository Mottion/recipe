import { User } from "@prisma/client"

export class LoginAuthDto {
  email: string
  pass: string

  constructor(args: User){
    this.email = args.email;
    this.pass = args.password;
  }

  static validate(args: User){
    return true
  }
}