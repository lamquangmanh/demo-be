import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  userRoleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
