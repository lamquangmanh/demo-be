import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteResourceRequestDto {
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
