import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class TagRepository {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createTagDto: CreateTagDto){
    const response = await this.prisma.tag.create({data: createTagDto});
    return response
  }
}