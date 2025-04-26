import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  deletedUserId: string;
}
