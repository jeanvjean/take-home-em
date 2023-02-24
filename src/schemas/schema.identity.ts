import mongoose, { Document } from 'mongoose';

export type Enrollment = {
  bank: string;
  registration_date: Date;
};

export interface IdentityInterface extends Document {
  firstname: string;
  middlename: string;
  lastname: string;
  aliases: string[];
  dob: Date;
  address: string;
  gender: string;
  photo_id: string;
  enrollment_date: Date;
  enrollment_bank: string;
  phones: [string];
  emails: [string];
  fullname: string;
  bvn: string;
  customer: string;
  identity: string;
  nin: string;
  lga_origin: string;
  lga_residence: string;
  nationality: string;
  state_residence: string;
  state_origin: string;
  enrollment: Enrollment;
  on_washlist: false;
  marital_status: string;
  account_level: string;
  verification_country: string;
}

export const IdentitySchema = new mongoose.Schema(
  {
    firstname: String,
    middlename: String,
    lastname: String,
    aliases: [String],
    dob: Date,
    address: String,
    gender: String,
    photo_id: String,
    enrollment_date: Date,
    enrollment_bank: String,
    phones: [String],
    emails: [String],
    fullname: String,
    bvn: String,
    customer: String,
    identity: String,
    nin: String,
    lga_origin: String,
    lga_residence: String,
    nationality: String,
    state_residence: String,
    state_origin: String,
    enrollment: {
      bank: String,
      registration_date: Date,
    },
    on_washlist: Boolean,
    marital_status: String,
    account_level: String,
    verification_country: String,
  },
  {
    timestamps: true,
  },
);
