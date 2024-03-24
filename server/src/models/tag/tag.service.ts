import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository 
  ){}

  async getTags(){
    const response = await this.tagRepository.getTags();
    return response;
  }
}
