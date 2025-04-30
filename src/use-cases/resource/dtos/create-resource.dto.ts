import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

// import from use-cases/action
import { CreateActionDto } from '@/use-cases/action';

export class CreateResourceActionDto extends OmitType(CreateActionDto, [
  'resourceId',
]) {}

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  moduleId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateResourceActionDto)
  actions: CreateResourceActionDto[];
}

export class CreateResourceRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => CreateResourceDto)
  resource: CreateResourceDto;
}
