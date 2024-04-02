import { ApiProperty } from '@nestjs/swagger';

export class IDeleteSuccess {
  @ApiProperty({
    description: 'deleted count',
  })
  deletedCount: number;
}
