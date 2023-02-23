import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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
    const accounts = await bvnAccounts(data);
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

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
