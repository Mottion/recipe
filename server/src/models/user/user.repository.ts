import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { createUserInput } from "./dto/inputs/create";
import { pickSelect } from "src/utils/pick-select";
import { updateUserInput } from "./dto/inputs/update";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async findByEmail(
    email: string,
    keys: (keyof Prisma.UserSelect)[] = ["id", "password"]
  ){
    const response = await this.prisma.user.findUnique({
      where: {email}, 
      select: pickSelect(keys) as Prisma.UserSelect
    });
    return response;
  }

  async create(
    user: createUserInput,
    keys: (keyof Prisma.UserSelect)[] = ["id", "name"]
  ){
    const response = await this.prisma.user.create({
      data: user,
      select: pickSelect(keys) as Prisma.UserSelect
    });
    return response;
  }

  async findById(
    id: string,
    keys: (keyof Prisma.UserSelect)[] = ["id", "email", "image", "name"]
  ){
    const response = await this.prisma.user.findFirst({
      where: {id},
      select: pickSelect(keys) as Prisma.UserSelect
    });
    return response;
  }
  
  async deleteById(
    id: string,
  ){
    const response = await this.prisma.user.delete({
      where: {id},
    });
    return response;
  }

  async update(
    id: string,
    data: updateUserInput,
    keys: (keyof Prisma.UserSelect)[] = ["id", "name", "image", "email"]
  ){
    const response = await this.prisma.user.update({
      where: {id},
      data: data,
      select: pickSelect(keys) as Prisma.UserSelect
    });
    return response;
  }


  async getById(
    id: string,
    keys: (keyof Prisma.UserSelect)[] = ["id", "name", "image", "email"]
  ){
    const response = await this.prisma.user.findFirst({
      where: {id},
      select: pickSelect(keys) as Prisma.UserSelect
    });
    return response;
  }
}