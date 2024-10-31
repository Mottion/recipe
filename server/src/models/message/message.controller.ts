import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { messageCreateDto } from './dto/message-create.dto';
import { pathId } from 'src/utils/dtos/path-id';
import { QueryMessageDto } from './dto/query.message.dto';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService
  ) {}
  
  @Post()
  async create(@Body() message: messageCreateDto, @Req() req: Request){
    return this.messageService.create(message, req["user"].id);
  }

  @Post("read/:id")
  async read(@Req() req: Request, @Param() params: pathId){
    return this.messageService.read(req["user"].id, params.id);
  }

  @Get()
  async getMessages(@Req() req: Request){
    return this.messageService.getMessages(req["user"].id);
  }

  @Get(":/id")
  async getUserMessages(@Req() req: Request, @Param() params: pathId,  @Query() query: QueryMessageDto){
    return this.messageService.getUserMessages(req["user"].id, params.id, +query.skip);
  }
}
