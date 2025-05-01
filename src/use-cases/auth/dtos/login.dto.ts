import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
