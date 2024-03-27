import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { grpcOptions } from '../../grpc-options';
import { UserRepository } from '../../models';
import { SharedModule } from '../shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcOptions,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
