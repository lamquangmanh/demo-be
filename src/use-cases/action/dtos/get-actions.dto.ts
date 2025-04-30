/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

// import from common
import {
  RequestType,
  REQUEST_TYPE_MAPPING,
  RequestTypeInput,
} from '@/common/constants';

export class GetActionsRequestDto {
  @IsOptional()
  @IsString()
  resourceId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsEnum(RequestTypeInput)
  @Transform(({ value }) => {
    return REQUEST_TYPE_MAPPING[value];
  })
  requestType: RequestType;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  method: string;
}
