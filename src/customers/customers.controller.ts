import {
  Controller,
  Version,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrincipalGuard } from 'src/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Version('1')
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(PrincipalGuard)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const createCustomer = await this.customersService.createCustomer(
      createCustomerDto,
    );
    return createCustomer;
  }
}
