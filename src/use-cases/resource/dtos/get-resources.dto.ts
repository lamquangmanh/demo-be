import { IsOptional, IsString } from 'class-validator';

export class GetResourcesRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  moduleId: string;
}
