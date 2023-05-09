import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the brand, must be unique' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the brand' })
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The country of the brand' })
  readonly country: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
