import { Schema, Document } from 'mongoose';

export interface WalletInterface extends Document {
  owner: string;
  currency: string;
  amount: number;
  dailyLimit: number;
}

export const walletSchema = new Schema(
  {
    owner: { type: String, required: true },
    currency: { type: String, default: 'NGN' },
    amount: { type: Number, default: 0 },
    dailyLimit: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export interface PaymentInterface extends Document {
  id: string;
  amount: string;
  created_at: string;
  credit_wallet: string;
  currency: string;
  debit_wallet: string;
  owner: string;
  ref: string;
  status: string;
}

export const paymentSchema = new Schema(
  {
    id: String,
    amount: String,
    created_at: String,
    credit_wallet: String,
    currency: String,
    debit_wallet: String,
    owner: String,
    ref: String,
    status: String,
  },
  {
    timestamps: true,
  },
);
