import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from '../../providers/auth/auth.module';
import { PrismaService } from '../../prisma.service';
import { cleanDB } from '../../../test/clean-db';
import { fakeUser, fakeUserComplete } from '../../mocks/random-mock';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { setupTokenUser } from '../../../test/setup-token-user';

describe('User:', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
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

  describe('POST /user', () => {
    beforeEach(async () => {
      await cleanDB(prisma)      
    })

    test("Should return 201 and create a user in the database without image", async () => {
      const user = fakeUser()
      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.CREATED);
      expect(response.body.access_token).not.toBeNull();
    });
    test("Should return 201 and create a user in the database with image", async () => {
      const user = fakeUser()
      user.image = "https://example.com"
      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.CREATED);
      expect(response.body.access_token).not.toBeNull();
    })
    test("It should return 500 and report an error due to the lack of necessary data", async () => {
      const user = fakeUser()
      delete user.name;
      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    })
    test("It should return 500 and inform that the email is already in use", async () => {
      const user = fakeUser()
      await prisma.user.create({data: user})

      const response = await request(app.getHttpServer())
      .post("/user")
      .send(user)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    })
  })
  describe('DELETE /user/:id', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("It should return 200 and a copy of the deleted user", async () => {
      const response = await request(app.getHttpServer())
      .delete(`/user/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(user.name);
    })
    test("It should return 404 and inform that the user was not found", async () => {
      const response = await request(app.getHttpServer())
      .delete(`/user/123`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBe("User not found");
    })
    test("It should return 401 when trying to delete a user that doesn't belong to you", async () => {
      const user2 = fakeUserComplete();
      await prisma.user.create({data: user2})
      
      const response = await request(app.getHttpServer())
      .delete(`/user/${user2.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toBe("Unauthorized");
    })
  })
  describe('PATCH /user/:id', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("Should return 200 and update a user's data successfully", async () => {
      const response = await request(app.getHttpServer())
      .patch(`/user/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({...user, name: "Name Teste"})
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe("Name Teste");
    })
    test("It should return 404 and inform that the user was not found", async () => {
      const response = await request(app.getHttpServer())
      .patch(`/user/123`)
      .set({ Authorization: `Bearer ${token}` })
      .send({...user, name: "Name Teste"})
      .expect(HttpStatus.NOT_FOUND);
    })
    test("It should return 401 and inform that there was no permission to change user data", async () => {
      const user2 = fakeUserComplete();
      await prisma.user.create({data: user2})

      const response = await request(app.getHttpServer())
      .patch(`/user/${user2.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({...user, name: "Name Teste"})
      .expect(HttpStatus.UNAUTHORIZED);
    })
    test("It should return 400 and inform that the email is already in use", async () => {
      const user2 = fakeUserComplete();
      await prisma.user.create({data: user2})

      const response = await request(app.getHttpServer())
      .patch(`/user/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({...user, email: user2.email})
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    })
  })
  describe('GET /user/:id', () => {
    let token: string;
    let user: User;

    beforeEach(async () => {
      const [userData, tokenData]: any = await setupTokenUser(prisma, jwtService)
      user = userData
      token = tokenData
    })

    test("Deve retornar 200 e trazer os dados do usuario", async () => {
      const response = await request(app.getHttpServer())
      .get(`/user/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.OK);
      expect(response.body.name).toBe(user.name);
    })
    test("Deve retornar 404 e informar que não encontrou o usuario", async () => {
      const response = await request(app.getHttpServer())
      .get(`/user/123`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(HttpStatus.NOT_FOUND);
    })
  })
});