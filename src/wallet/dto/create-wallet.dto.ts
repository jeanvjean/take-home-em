import { IsString, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  amount: number;
  @IsNumber()
  dailyLimit: number;
  @IsString()
  currency: string;
}

export class FundWalletDto {
  @IsNumber()
  amount: number;
  @IsString()
  wallet: string;
}

export class MakePaymentDto {
  @IsNumber()
  amount: number;
  @IsString()
  currency: string;
  @IsString()
  wallet_to_debit: string;
  @IsString()
  wallet_to_credit: string;
}
