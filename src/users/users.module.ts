import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserMiddleware,
  AuthMiddleware,
} from '../../src/middlewares/users.middleware';
import { userSchema } from '../../src/schemas/schema.user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: 'v1/users',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/v1/users',
      method: RequestMethod.GET,
    });
  }
}
