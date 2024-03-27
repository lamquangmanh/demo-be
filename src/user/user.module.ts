import { Module } from '@nestjs/common';

import { UserRepository } from '../models';
import { SharedModule } from '../shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
