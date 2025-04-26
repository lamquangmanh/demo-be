import { OmitType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['email']) {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @IsOptional()
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
}

export class UpdateUserRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;
}
