import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteActionRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  actionId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
