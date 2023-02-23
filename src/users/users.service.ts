import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInterface } from 'src/schemas/schema.user';
import { InjectModel } from '@nestjs/mongoose';
import Hash from '../util/util.hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}
  async createUser(data: any): Promise<UserInterface> {
    const { password } = data;
    const hashPassword = await Hash.hashSync(password);
    const user = new this.userModel({
      ...data,
      password: hashPassword,
    });
    await user.save();
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find({});
    return [...users];
  }

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  async loginUser(data) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordMatch = await Hash.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error('invalid credentials');
    }
    const genToken = await Hash.signUser({ id: user._id, email: user.email });
    return {
      user,
      token: genToken,
      message: 'login successful',
    };
  }
}
