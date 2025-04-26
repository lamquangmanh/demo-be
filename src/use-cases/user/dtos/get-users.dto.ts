/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsEmail,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';

// import from common
import {
  UserStatus,
  USER_STATUS_MAPPING,
  UserStatusInput,
} from '@/common/constants';

export class GetUsersRequestDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEnum(UserStatusInput)
  @Transform(({ value }) => {
    return USER_STATUS_MAPPING[Number(value)] ?? undefined;
  })
  status: UserStatus;
}
