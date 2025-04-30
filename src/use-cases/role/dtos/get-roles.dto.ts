import { IsOptional, IsString } from 'class-validator';

export class GetRolesRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  moduleId: string;
}
