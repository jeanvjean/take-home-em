import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { walletSchema, paymentSchema } from '../schemas/schema.wallet';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/middlewares/users.middleware';
import { userSchema } from '../schemas/schema.user';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Wallet', schema: walletSchema },
      { name: 'User', schema: userSchema },
      { name: 'Payment', schema: paymentSchema },
    ]),
    UsersModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/v1/wallet',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/v1/wallet/fund',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/v1/wallet/payment/initiate',
      method: RequestMethod.POST,
    });
  }
}
