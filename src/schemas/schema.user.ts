import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, required: true },
    password: String,
  },
  {
    timestamps: true,
  },
);

export interface UserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
