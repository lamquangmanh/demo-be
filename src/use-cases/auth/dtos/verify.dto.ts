import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

// import from common
import { RequestType } from '@/common/constants';

export class VerifyRequestDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsEnum(RequestType)
  requestType: RequestType;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  method: string;
}
