import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  bvn: string;
}
