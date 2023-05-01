import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateBrandDto{
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
