import { ApiProperty } from '@nestjs/swagger';

export class UpdateSuccessDto {
  @ApiProperty({
    description: 'number of modified',
  })
  modifiedCount: number;
}
