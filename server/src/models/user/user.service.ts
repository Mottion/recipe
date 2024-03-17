import { Injectable, NotFoundException, UnauthorizedException, UnsupportedMediaTypeException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../../providers/auth/dto/access-token.dto';
import { updateUserDto } from './dto/update-user-dto';
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

  async checkAuthorization(id: string, req: Request){
    const user = await this.userRepository.findById(id, ["id"]);
    if(!user){
      throw new NotFoundException("User not found");
    }
    if(user.id !== req["user"].id){
      throw new UnauthorizedException();
    }
  }

  async findByEmail(email: string){
    const response = await this.userRepository.findByEmail(email);
    if(!response) throw new NotFoundException("Email not registered in the system");
    return response;
  }

  async create(user: createUserDto){
    const response = await this.userRepository.create(user);
    const payload = { id: response.id, name: response.name };
    return new AccessTokenDto(await this.jwtService.signAsync(payload));
  }

  async deleteById(id: string, req: Request){
    await this.checkAuthorization(id, req)
    const response = await this.userRepository.deleteById(id);
    return response
  }

  async update(id: string, data: updateUserDto, req: Request){
    await this.checkAuthorization(id, req)
    const response = await this.userRepository.update(id, data);
    return response
  }

  async findById(id: string){
    const response = await this.userRepository.findById(id);
    if(!response) throw new NotFoundException("User not found");
    return response;
  }
  
}
