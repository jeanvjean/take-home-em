import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { bvnAccounts, bvnCustomer } from '../util/util.services';
import { Model } from 'mongoose';
import { CustomerInterface } from 'src/schemas/schema.customers';
import { IdentityInterface } from '../schemas/schema.identity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerInterface>,
    @InjectModel('Identity')
    private readonly identityModel: Model<IdentityInterface>,
  ) {}
  async createCustomer(data: CreateCustomerDto) {
    console.log({ data });
    const accounts = await bvnAccounts(data);
    console.log({ accounts });
    return accounts.data.response.map(async (account) => {
      const customer = await bvnCustomer({
        nuban: account.account_no,
        bank: account.bank,
        bvn: data.bvn,
      });
      const newCustomer = new this.customerModel({
        ...customer.response,
      });
      const check = await this.customerModel.findOne({
        account_number: account.account_no,
      });
      const dn = !check
        ? await newCustomer.save()
        : await check.update(check._id, { ...newCustomer });
      return dn;
    });
  }
}
