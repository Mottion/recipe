import { Injectable, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user.repository';
const fs = require('fs');

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ){}

  async checkFileType(file: Express.Multer.File) {
    if(file.mimetype != "image/jpeg" && file.mimetype != "image/png"){
      fs.unlink(file.path, (error) => {
        if (error) console.log(error);
      })
      throw new UnsupportedMediaTypeException("the image does not follow the PNG or JPEG standards.")
    }
    return file.path;
  }

  async findByEmail(email: string){
    const response = await this.userRepository.findByEmail(email);
    if(!response) throw new NotFoundException("Email not registered in the system.");
    return response;
  }

}
