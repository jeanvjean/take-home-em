import {
  Controller,
  Version,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Version('1')
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const createCustomer = await this.customersService.createCustomer(
      createCustomerDto,
    );
    return createCustomer;
  }
}
