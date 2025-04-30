import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  roleId: string;

  @IsOptional()
  @IsString()
  resourceId?: string;

  @IsNotEmpty()
  @IsString()
  actionId: string;
}

export class CreatePermissionRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => CreatePermissionDto)
  permission: CreatePermissionDto;
}
