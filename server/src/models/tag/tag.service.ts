import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository 
  ){}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.create(createTagDto);
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
