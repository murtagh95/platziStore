import { IsString, IsNumber, IsArray, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
