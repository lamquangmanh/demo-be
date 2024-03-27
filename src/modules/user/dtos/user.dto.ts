import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'id' })
  id?: number;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'username' })
  username: string;
}
