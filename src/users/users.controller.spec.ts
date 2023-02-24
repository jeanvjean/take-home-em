import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { UsersModule } from '../../src/users/users.module';
import * as supertest from 'supertest';
import 'dotenv/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userSchema } from '../../src/schemas/schema.user';

describe('UserController', () => {
  let app: NestExpressApplication;
  console.log({ supertest });

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`${process.env.TEST_DATABASE_STRING}`),
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
        UsersModule,
      ],
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(process.env.PORT || 3000);
  });

  it('should create user', async () => {
    const api = apiClient();
      .post('/v1/users')
      .send({
        email: 'jay5@mailinator.com',
        password: 'password@1',
        name: 'Freddy jay',
      })
      .end((err, res) => {
        if (err) {
          console.log({ err, res });
        }
        console.log(res.body);
      });
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });
});
