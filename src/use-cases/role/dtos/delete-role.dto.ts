import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
