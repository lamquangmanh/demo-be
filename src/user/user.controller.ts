import { Controller, Get, Inject, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dtos';

@Controller('users')
export class UserController {
  @Inject()
  private service: UserService;

  @Get('/me')
  async me(@Req() req: any): Promise<UserDto | null> {
    return this.service.getUser(req.user.id);
  }

  async getUser(userId: number): Promise<UserDto | null> {
    return this.service.getUser(userId);
  }
}
