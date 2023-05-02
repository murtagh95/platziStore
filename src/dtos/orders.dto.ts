import { IsString, IsNumber, IsArray, IsNotEmpty, IsPositive } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateOrderDto{
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly product_ids: number[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly customer_id: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
