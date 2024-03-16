import { Module } from '@nestjs/common';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './providers/auth/auth.module';
import { TagModule } from './models/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', ".env.development"]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    UserModule,
    AuthModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
