import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { createUserInput } from "./dto/inputs/create";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async findByEmail(email: string): Promise<User>{
    const response = await this.prisma.user.findUnique({
      where: {email}, 
    });
    return response;
  }

  async create(
    user: createUserInput,
    keys: (keyof Prisma.UserSelect)[] = ["id", "name"]
  ): Promise<Partial<User>>{
    const response = await this.prisma.user.create({
      data: user,
      select: keys.reduce((obj, key) => ({...obj, [key]: true}), {})
    });
    return response;
  }
}