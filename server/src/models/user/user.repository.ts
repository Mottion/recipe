import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

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
}