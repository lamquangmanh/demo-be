import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

import { CreateResourceDto } from './create-resource.dto';

// import from use-cases/action
import { UpdateActionDto } from '@/use-cases/action';

export class UpdateResourceActionDto extends OmitType(UpdateActionDto, [
  'resourceId',
  'actionId',
]) {
  @IsOptional()
  @IsString()
  actionId: string;
}

export class UpdateResourceDto extends OmitType(CreateResourceDto, [
  'actions',
]) {
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateResourceActionDto)
  actions: UpdateResourceActionDto[];
}

export class UpdateResourceRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateResourceDto)
  resource: UpdateResourceDto;
}
