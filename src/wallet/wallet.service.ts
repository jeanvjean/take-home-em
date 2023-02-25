import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletInterface, PaymentInterface } from '../schemas/schema.wallet';
import { UserInterface } from '../schemas/schema.user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<WalletInterface>,
    @InjectModel('Payment')
    private readonly paymentModel: Model<PaymentInterface>,
  ) {}
  async createWallet(data: CreateWalletDto, user: UserInterface) {
    try {
      const wallet = new this.walletModel({ ...data, owner: user._id });
      const createdWallet = await wallet.save();
      return createdWallet;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fundWallet(data: any) {
    try {
      const getWallet = await this.walletModel.findOne({ _id: data.wallet });
      if (!getWallet) {
        throw new BadRequestException('Wallet not found');
      }
      const wallet = await this.walletModel.findByIdAndUpdate(
        data.wallet,
        { amount: +getWallet.amount + +data.amount },
        { new: true },
      );
      return wallet;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async makePayment(data: any) {
    try {
      const unavailable_debit_wallet = [];
      const unavailable_credit_wallet = [];
      data.map(async (item) => {
        const debitWallet = await this.walletModel.findOne({
          _id: item.wallet_to_debit,
        });
        const creditWallet = await this.walletModel.findOne({
          _id: item.wallet_to_credit,
        });
        if (!debitWallet) {
          unavailable_debit_wallet.push(item);
          const payment = new this.paymentModel({
            ...item,
            ref: Math.floor(100000 + Math.random() * 900000).toString(),
            status: 'declined',
          });
          payment.save();
        } else {
          if (debitWallet.amount > item.amount) {
            await this.walletModel.findByIdAndUpdate(item.wallet_to_debit, {
              amount: +debitWallet.amount - +item.amount,
            });
            const payment = new this.paymentModel({
              ...item,
              ref: Math.floor(100000 + Math.random() * 900000).toString(),
              status: 'initiated',
            });
            payment.save();
          } else {
            unavailable_debit_wallet.push(item);
            const payment = new this.paymentModel({
              ...item,
              ref: Math.floor(100000 + Math.random() * 900000).toString(),
              status: 'declined',
            });
            payment.save();
          }
        }
        if (!creditWallet) {
          unavailable_credit_wallet.push(item);
          const payment = new this.paymentModel({
            ...item,
            ref: Math.floor(100000 + Math.random() * 900000).toString(),
            status: 'declined',
          });
          await this.walletModel.findByIdAndUpdate(item.wallet_to_debit, {
            amount: +debitWallet.amount + +item.amount,
          });
          payment.save();
        } else {
          if (debitWallet.amount > item.amount) {
            await this.walletModel.findByIdAndUpdate(item.wallet_to_credit, {
              amount: +creditWallet.amount + +item.amount,
            });
            const payment = new this.paymentModel({
              ...item,
              ref: Math.floor(100000 + Math.random() * 900000).toString(),
              status: 'initiated',
            });
            payment.save();
          } else {
            unavailable_credit_wallet.push(item);
            const payment = new this.paymentModel({
              ...item,
              ref: Math.floor(100000 + Math.random() * 900000).toString(),
              status: 'declined',
            });
            payment.save();
          }
        }
      });
      return 'done';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
