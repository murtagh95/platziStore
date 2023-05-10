import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsDate()
  @ApiProperty({ description: 'Date of creation' })
  readonly date: Date;

  @IsMongoId()
  @IsNotEmpty()
  readonly customer: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
