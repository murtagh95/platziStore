import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto{
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly dni: string;

  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
