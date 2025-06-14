import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  icon: string;
}

export class CreateProductRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;
}
