import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

export const bvnAccounts = async (data) => {
  try {
    const accounts = await axios.post(`${process.env.ACCOUNT_URL}`, data);
    return accounts.data;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const bvnCustomer = async (data) => {
  try {
    const account = await axios.post(`${process.env.CUSTOMER_URL}`, data);
    return account.data.data;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const bvnIdentity = async (data) => {
  try {
    const account = await axios.post(`${process.env.IDENTITY_URL}`, data);
    return account.data.data;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};
