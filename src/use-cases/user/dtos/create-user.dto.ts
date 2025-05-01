/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsPhoneNumber,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

// import from common
import {
  UserStatus,
  USER_STATUS_MAPPING,
  UserStatusInput,
} from '@/common/constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character',
    },
  )
  password: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsEnum(UserStatusInput)
  @Transform(({ value }) => {
    return USER_STATUS_MAPPING[Number(value)] ?? undefined;
  })
  status: UserStatus;

  @IsArray()
  @IsString({ each: true })
  roleIds: string[];
}

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
