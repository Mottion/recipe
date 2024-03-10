import { Injectable, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './user.repository';
import { createUserInput } from './dto/inputs/create';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenOutput } from 'src/providers/auth/dto/outputs/access-token';
const fs = require('fs');

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
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

  async create(user: createUserInput){
    const response = await this.userRepository.create(user);
    const payload = { id: response.id, name: response.name };
    return new AccessTokenOutput(await this.jwtService.signAsync(payload));
  }

}
