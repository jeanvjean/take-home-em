/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Req,
  ValidationPipe,
  UsePipes,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  FundWalletDto,
  MakePaymentDto,
} from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Request } from 'express';
import { PrincipalGuard } from 'src/auth.guard';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Version('1')
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async createWallet(
    @Body() createWalletDto: CreateWalletDto,
    @Req() req: Request,
  ) {
    const wallet = await this.walletService.createWallet(
      createWalletDto,
      // @ts-ignore
      req.user,
    );
    return wallet;
  }

  @Version('1')
  @Post('/fund')
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async fundWallet(@Body() fundWalletDto: FundWalletDto) {
    const fundWallet = await this.walletService.fundWallet(fundWalletDto);
    return {
      status: 'success',
      message: 'wallet funded successfully',
      data: {
        wallet: {
          id: fundWallet._id,
          amount: fundWallet.amount,
        },
      },
    };
  }

  @Version('1')
  @Post('/payment/initiate')
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async makePayment(@Body('data') makePaymentDto: MakePaymentDto[]) {
    try {
      const payment = await this.walletService.makePayment(makePaymentDto);
      return payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
