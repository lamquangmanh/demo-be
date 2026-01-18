import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOnlineUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  socketId: string;

  @IsOptional()
  @IsString()
  currentPageUrl?: string;

  @IsOptional()
  @IsString()
  deviceInfo?: string;
}

export class UpdateOnlineUserRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateOnlineUserDto)
  onlineUser: UpdateOnlineUserDto;
}
