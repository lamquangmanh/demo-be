import { IsOptional, IsString } from 'class-validator';

export class GetRolesRequestDto {
  @IsOptional()
  @IsString()
  resourceId: string;

  @IsOptional()
  @IsString()
  moduleId: string;

  @IsOptional()
  @IsString()
  roleId: string;
}
