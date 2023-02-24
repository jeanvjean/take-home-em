import { IdentitySchema } from './../schemas/schema.identity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from '../schemas/schema.customers';
import { userSchema } from '../schemas/schema.user';
import { AuthMiddleware } from '../../src/middlewares/users.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Identity', schema: IdentitySchema },
      { name: 'User', schema: userSchema },
    ]),
    UsersModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'v1/customers',
      method: RequestMethod.POST,
    });
  }
}
