import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOnlineUserRequestDto {
  @IsString()
  @IsNotEmpty()
  socketId: string;
}
