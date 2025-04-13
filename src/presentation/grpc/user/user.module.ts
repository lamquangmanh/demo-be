import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../use-cases/user/create-user.use-case';
import { LoginUseCase } from '../../../use-cases/auth/login.use-case';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepository) => new CreateUserUseCase(userRepo),
      inject: [UserRepository],
    },
    {
      provide: LoginUseCase,
      useFactory: (userRepo: UserRepository) => new LoginUseCase(userRepo),
      inject: [UserRepository],
    },
    UserRepository,
  ],
})
export class UserModule {}
