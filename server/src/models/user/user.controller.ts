import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createUserInput } from './dto/inputs/create';
import { Public } from 'src/providers/auth/public.decorator';
import { updateUserInput } from './dto/inputs/update';

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
  @Post("/create")
  async create(@Body() body: createUserInput){
    return await this.userService.create(body);
  }

  @Delete("/:id")
  async deleteById(@Req() req: Request, @Param() params: {id: string}){
    return await this.userService.deleteById(params.id, req);
  }

  @Delete("/:id")
  async update(@Req() req: Request, @Body() body: updateUserInput, @Param() params: {id: string}){
    return await this.userService.update(params.id, body, req);
  }


}
