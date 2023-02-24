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
    console.log(data, process.env.CUSTOMER_URL);
    const account = await axios.post(`${process.env.CUSTOMER_URL}`, data);
    console.log({ account: account.data.data });
    return account.data.data;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};
