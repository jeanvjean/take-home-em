import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { UsersModule } from 'src/users/users.module';
import * as supertest from 'supertest';

console.log({ port: process.env.PORT });

describe('UserController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`${process.env.TEST_DATABASE_STRING}`), // we use Mongoose here, but you can also use TypeORM
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(process.env.PORT);
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });
  it('should create user', () => {
    apiClient()
      .post('/v1/users')
      .send({
        email: 'jay5@mailinator.com',
        password: 'password@1',
        name: 'Freddy jay',
      })
      .end((err, res) => {
        console.log({ res });
      });
  });
});
