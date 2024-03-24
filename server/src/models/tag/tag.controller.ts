import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(){
    return await this.tagService.getTags();
  }

}
