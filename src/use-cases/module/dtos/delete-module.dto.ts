import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteModuleRequestDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
