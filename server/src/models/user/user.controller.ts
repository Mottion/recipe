import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createUserDto } from './dto/create-user.dto';
import { Public } from '../../providers/auth/public.decorator';
import { updateUserDto } from './dto/update-user-dto';
import { pathId } from 'src/utils/dtos/path-id';
import { updateFollowDto } from './dto/update-follow.dto';

const multerInterceptor = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = file.mimetype.split("/").pop();
      cb(null,uniquePreffix + "-" + file.originalname + "." + extension)
    }
  }),
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @Public()
  @Post("/uploadImage")
  @UseInterceptors(FileInterceptor("file", multerInterceptor))
  async uploadImage(@UploadedFile() file: Express.Multer.File){
    return await this.userService.checkFileType(file);
  }

  @Public()
  @Post()
  async create(@Body() body: createUserDto){
    return await this.userService.create(body);
  }

  @Delete("/:id")
  async deleteById(@Req() req: Request, @Param() params: pathId){
    return await this.userService.deleteById(params.id, req);
  }

  @Patch()
  async update(@Req() req: Request, @Body() body: updateUserDto){
    return await this.userService.update(req["user"].id, body);
  }


  @Patch("/follow")
  async updateFollow(@Req() req: Request, @Body() body: updateFollowDto){
    return await this.userService.updateFollow(req["user"].id, body);
  }

  @Get("/:id")
  async findById(@Param() params: pathId, @Req() req: Request){
    return await this.userService.findById(params.id, req["user"].id)
  }

  @Get("/")
  async getMyUser(@Req() req: Request){
    return await this.userService.getMyUser(req["user"])
  }
}
