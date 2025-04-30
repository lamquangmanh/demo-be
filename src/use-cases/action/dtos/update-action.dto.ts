import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateActionDto } from './create-action.dto';

export class UpdateActionDto extends CreateActionDto {
  @IsString()
  @IsNotEmpty()
  actionId: string;
}

export class UpdateActionRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateActionDto)
  action: UpdateActionDto;
}
