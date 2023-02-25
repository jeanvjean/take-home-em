import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DATABASE_STRING}`),
    UsersModule,
    CustomersModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
