/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { UserInterface } from 'src/schemas/schema.user';
import Hash from '../util/util.hash';

export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const {
      body: { email },
    } = req;
    const user = await this.userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'a user with this email already exists',
      });
    }
    next();
  }
}

export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const token = headers['authorization'];
    if (!token) {
      throw new BadRequestException('Please provide a token');
    }
    const decoded = await Hash.verify(token);
    if (decoded) {
      // @ts-ignore
      req.user = await this.userModel.findOne({ email: decoded.email });
      return next();
    }
    throw new BadRequestException('invalid token');
  }
}
