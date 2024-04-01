import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class GetOneDto {
  @ApiProperty({
    description: 'id is mongo id',
  })
  @IsDefined()
  id: number;
}
