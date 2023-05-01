import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateProductDto{
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
