import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  MinLength,
  Matches,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ChangePasswordUserDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @IsDefined()
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

export class ChangePasswordUserRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'User is is required' })
  userId: string;

  @ValidateNested()
  @Type(() => ChangePasswordUserDto)
  user: ChangePasswordUserDto;
}
