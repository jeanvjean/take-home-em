import { Schema, Document } from 'mongoose';

export interface CustomerInterface extends Document {
  birthdate: string;
  account_number: string;
  bank: string;
  full_name: string;
  email: string;
  phone_number: string;
  bvn: string;
}

export const CustomerSchema = new Schema(
  {
    birthdate: String,
    account_number: String,
    bank: String,
    full_name: String,
    email: String,
    phone_number: String,
    bvn: String,
  },
  {
    timestamps: true,
  },
);
