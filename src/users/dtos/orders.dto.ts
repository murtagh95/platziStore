import { IsString, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { User } from '../entities/users.entity';
import { Product } from '../../products/entities/products.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @IsNotEmpty()
  readonly product_ids: Product[];

  @IsDate()
  readonly date: Date;

  readonly user: User;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
