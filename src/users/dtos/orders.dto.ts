import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsDate()
  @ApiProperty({ description: 'Date of creation' })
  readonly date: Date;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer who owns the order' })
  readonly customer: string;

  @IsNotEmpty()
  @IsArray()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @IsNotEmpty()
  @IsArray()
  readonly productsIds: string[];
}
