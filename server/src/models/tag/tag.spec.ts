import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from '../../providers/auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { cleanDB } from '../../../test/clean-db';
import { fakeUser, fakeUserComplete } from '../../mocks/random-mock';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { setupTokenUser } from '../../../test/setup-token-user';
import { TagModule } from './tag.module';

describe('Tag:', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TagModule, AuthModule],
      providers: [PrismaService]
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwtService =  moduleRef.get<JwtService>(JwtService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});