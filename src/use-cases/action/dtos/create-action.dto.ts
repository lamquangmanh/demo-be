/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

// import from common
import {
  RequestType,
  REQUEST_TYPE_MAPPING,
  RequestTypeInput,
} from '@/common/constants';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(RequestTypeInput)
  @Transform(({ value }) => {
    return REQUEST_TYPE_MAPPING[value];
  })
  requestType: RequestType;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  method: string;
}

export class CreateActionRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => CreateActionDto)
  action: CreateActionDto;
}
