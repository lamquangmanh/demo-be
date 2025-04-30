import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

import { CreateRoleDto, CreateRolePermissionDto } from './create-role.dto';

export class UpdateRolePermissionDto extends CreateRolePermissionDto {
  @IsNotEmpty()
  @IsString()
  permissionId?: string;
}

export class UpdateRoleDto extends OmitType(CreateRoleDto, ['permissions']) {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateRolePermissionDto)
  permissions: UpdateRolePermissionDto[];
}

export class UpdateRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateRoleDto)
  role: UpdateRoleDto;
}
