import mongoose, { Document } from 'mongoose';

export type Enrollment = {
  bank: string;
  registration_date: Date;
};

export interface IdentityInterface extends Document {
  firstname: string;
  middlename: string;
  lastname: string;
  aliases: [string];
  dateofbirth: string;
  address: string;
  gender: string;
  photo_id: string;
  enrollment_date: string;
  enrollment_bank: string;
  phone: string;
  email: string;
  fullname: string;
  bvn: string;
  customer: string;
  identity: string;
  nin: string;
  lgaorigin: string;
  state_of_residence: string;
  nationality: string;
  state_residence: string;
  state_of_origin: string;
  registrationdate: string;
  enrollment: {
    bank: string;
    registration_date: string;
  };
  watchlist: boolean;
  maritalstatus: string;
  accountlevel: string;
  verificationcountry: string;
}

export const IdentitySchema = new mongoose.Schema(
  {
    firstname: String,
    middlename: String,
    lastname: String,
    aliases: [String],
    dateofbirth: Date,
    address: String,
    gender: String,
    photo_id: String,
    enrollment_date: Date,
    enrollment_bank: String,
    phone: String,
    email: String,
    fullname: String,
    bvn: String,
    customer: String,
    identity: String,
    nin: String,
    lgaorigin: String,
    state_of_residence: String,
    nationality: String,
    state_residence: String,
    state_of_origin: String,
    registrationdate: String,
    enrollment: {
      bank: String,
      registration_date: Date,
    },
    watchlist: Boolean,
    maritalstatus: String,
    accountlevel: String,
    verificationcountry: String,
  },
  {
    timestamps: true,
  },
);
