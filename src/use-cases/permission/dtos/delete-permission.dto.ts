import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePermissionRequestDto {
  @IsString()
  @IsNotEmpty()
  permissionId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
