import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class CreateModuleRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => CreateModuleDto)
  module: CreateModuleDto;
}
