import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createUserInput } from './dto/inputs/create';
import { Public } from 'src/providers/auth/public.decorator';

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

  @Post("/uploadImage")
  @UseInterceptors(FileInterceptor("file", multerInterceptor))
  async uploadImage(@UploadedFile() file: Express.Multer.File){
    return await this.userService.checkFileType(file);
  }

  @Public()
  @Post("/create")
  async create(@Body() body: createUserInput){
    return await this.userService.create(body);
  }

}
