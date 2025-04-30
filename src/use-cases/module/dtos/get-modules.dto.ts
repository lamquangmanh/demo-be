import { IsOptional, IsString } from 'class-validator';

export class GetModulesRequestDto {
  @IsOptional()
  @IsString()
  name: string;
}
