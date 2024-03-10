import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: LoginInput){
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }
}
