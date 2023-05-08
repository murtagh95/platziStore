import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the product' })
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Price of the product' })
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Quantity of product in stock' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'The url of the product' })
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  offset: number;
}
