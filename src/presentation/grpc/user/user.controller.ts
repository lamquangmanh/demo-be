import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserUseCase } from '../../../use-cases/user/create-user.use-case';
import { LoginUseCase } from '../../../use-cases/auth/login.use-case';
import { CreateUserInput, LoginInput } from '../../../domain/types/common';
import { User } from '../../../domain/entities/user.entity';

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserInput): Promise<User> {
    return this.createUserUseCase.execute(data);
  }

  @GrpcMethod('UserService', 'Login')
  async login(data: LoginInput): Promise<User | null> {
    return this.loginUseCase.execute(data);
  }
}
