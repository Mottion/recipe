import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../models/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_CONSTANT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
