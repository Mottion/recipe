import { ConflictException, Injectable, NotFoundException, UnauthorizedException, UnsupportedMediaTypeException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../../providers/auth/dto/access-token.dto';
import { updateUserDto } from './dto/update-user-dto';
import { updateFollowDto } from './dto/update-follow.dto';
import { Prisma } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';
const fs = require('fs');

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService
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

  async getMyUser(user: {id: string}){
    const response = await this.userRepository.findById(user.id);
    if(!response) throw new NotFoundException("User Not Found");
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

  async update(id: string, data: updateUserDto){
    if(data.newPassword !== data.passwordConfirm){
      throw new ConflictException("error validating password confirmation");
    }

    const {image, name, newPassword} = data; 

    const response = await this.userRepository.update(id, {
      image, name, password: newPassword
    });
    return response
  }


  async updateFollow(requesterId: string, body: updateFollowDto){
    let query: Prisma.UserUpdateInput = {};

    if(body.newState){
      query = {followers: {connect: {id: requesterId}}};
    }else{
      query = {followers: {disconnect: {id: requesterId}}}; 
    }

    const {followers, ...response} = await this.userRepository.update(body.id, query, requesterId);
    const isFollower = followers.length > 0 ? true : false;
    if(isFollower){
      this.notificationService.create(
        {
          title: "New Follower", 
          description: `${followers[0].name} started following you`
        },
        body.id
      )
    }
    return {...response, isFollower}
  }

  async findById(id: string, userId: string){
    const response = await this.userRepository.findById(id);
    if(!response) throw new NotFoundException("User not found");
    const isFollower = await this.userRepository.checkIfIsFollower(userId, response.id)
    const IsMyProfile = id == userId;
    return {...response, isFollower, IsMyProfile};
  }
  
}
