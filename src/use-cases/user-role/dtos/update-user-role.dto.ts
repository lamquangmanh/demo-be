import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends CreateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  userRoleId: string;
}

export class UpdateUserRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateUserRoleDto)
  userRole: UpdateUserRoleDto;
}
