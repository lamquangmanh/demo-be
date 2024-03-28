import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId } from 'class-validator';

export class GetOneDto {
  @ApiProperty({
    description: 'id is mongo id',
  })
  @IsDefined()
  @IsMongoId()
  id: string;
}
