import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Get("route")
  async route(){
    return "route";
  }
}
