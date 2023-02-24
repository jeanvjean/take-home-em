import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { bvnAccounts, bvnCustomer, bvnIdentity } from '../util/util.services';
import { Model } from 'mongoose';
import { CustomerInterface } from 'src/schemas/schema.customers';
import { IdentityInterface } from '../schemas/schema.identity';
import { InjectModel } from '@nestjs/mongoose';
import { months } from '../util/utils.constants';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerInterface>,
    @InjectModel('Identity')
    private readonly identityModel: Model<IdentityInterface>,
  ) {}
  async createCustomer(data: CreateCustomerDto) {
    try {
      let identityResponse;
      const check = await this.customerModel.findOne({
        bvn: data.bvn,
      });
      if (!check) {
        const accounts = await bvnAccounts(data);
        accounts.data.response.map(async (account) => {
          const customer = await bvnCustomer({
            nuban: account.account_no,
            bank: account.bank,
            bvn: data.bvn,
          });
          const dobSplit = customer.response.birthdate.split(' ');
          const newCustomer = new this.customerModel({
            ...customer.response,
          });
          const dn = await newCustomer.save();
          const idData = {
            dob: `${dobSplit[2]}-${months.indexOf(dobSplit[0]) + 1}-01`,
            bvn: data.bvn,
          };
          const saveId = await bvnIdentity(idData);
          let obj = {};
          Object.entries(saveId.response).map((doc) => {
            obj = { ...obj, [doc[0].toLowerCase()]: doc[1] };
          });
          const idMode = new this.identityModel({
            ...obj,
          });
          identityResponse = await idMode.save();
          return dn;
        });
      }
      identityResponse = await this.identityModel.findOne({ bvn: data.bvn });

      return identityResponse;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
