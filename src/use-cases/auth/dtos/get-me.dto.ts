import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetMeRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
