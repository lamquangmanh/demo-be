import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @IsString()
  actionId: string;

  @IsNotEmpty()
  @IsString()
  resourceId: string;
}

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  moduleId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateRolePermissionDto)
  permissions: CreateRolePermissionDto[];
}

export class CreateRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => CreateRoleDto)
  role: CreateRoleDto;
}
