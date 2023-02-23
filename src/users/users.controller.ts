import {
  Controller,
  Version,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { PrincipalGuard } from 'src/auth.guard';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  @ApiBody({ type: CreateUserDto })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.createUser(createUserDto);
    return data;
  }

  @Version('1')
  @Get()
  @HttpCode(200)
  @UseGuards(PrincipalGuard)
  async getUsers() {
    const users = await this.usersService.getUsers();
    return {
      data: users,
      message: 'Fetched users successfully',
    };
  }

  @Version('1')
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return {
      user,
      message: 'fetched user information',
    };
  }

  @Version('1')
  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDto) {
    const user = await this.usersService.loginUser(loginUser);
    return user;
  }
}
