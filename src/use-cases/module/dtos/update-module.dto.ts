import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;
}

export class UpdateModuleRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateModuleDto)
  module: UpdateModuleDto;
}
