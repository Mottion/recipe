import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  
  async signIn(email: string, pass: string): Promise<{access_token: string}> {
    const user = await this.usersService.findByEmail(email);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, name: user.name };

    return {  
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}