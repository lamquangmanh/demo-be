import { IsOptional, IsString } from 'class-validator';

export class GetUserRolesRequestDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  roleId: string;
}
