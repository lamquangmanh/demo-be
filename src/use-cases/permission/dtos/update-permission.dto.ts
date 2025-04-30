import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  permissionId: string;
}

export class UpdatePermissionRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdatePermissionDto)
  permission: UpdatePermissionDto;
}
