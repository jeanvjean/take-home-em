import { Document, Schema } from 'mongoose';

export interface WalletInterface extends Document {
  owner: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  dailyLimit: number;
}

export const walletSchema = new Schema({
  owner: Schema.Types.ObjectId,
  amount: { type: Number, default: 0 },
  currency: { type: String, default: 'NGN' },
  dailyLimit: { type: Number, default: 0 },
});
