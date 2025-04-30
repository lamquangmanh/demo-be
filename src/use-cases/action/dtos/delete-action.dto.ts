import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteActionRequestDto {
  @IsString()
  @IsNotEmpty()
  actionId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
