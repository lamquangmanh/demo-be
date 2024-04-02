import { ApiProperty } from '@nestjs/swagger';

export class IUpdateSuccess {
  @ApiProperty({
    description: 'number of modified',
  })
  modifiedCount: number;
}
