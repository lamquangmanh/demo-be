import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  @ApiProperty({ description: 'id' })
  id?: number;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'username' })
  username: string;
}
