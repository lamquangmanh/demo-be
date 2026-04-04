// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  CreateUserUseCase,
  CreateUserRequestDto,
  CreateUserSuccessResponse,
  GetUserUseCase,
  GetUsersSuccessResponse,
  GetUsersUseCase,
  UpdateUserUseCase,
  UpdateUserRequestDto,
  DeleteUserUseCase,
  DeleteUserRequestDto,
  ChangePasswordUserRequestDto,
  ChangePasswordUseCase,
} from '@/use-cases/user';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { UserEntity } from '@/domain/entities';

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser({ userId }): Promise<UserEntity | null> {
    return await this.getUserUseCase.execute(userId, true);
  }

  @GrpcMethod('UserService', 'GetUsers')
  async getUsers(data: any): Promise<GetUsersSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getUsersUseCase.execute(dto);
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: any): Promise<CreateUserSuccessResponse> {
    const dto = await validateDto(data, CreateUserRequestDto);
    return this.createUserUseCase.execute(dto);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: any): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateUserRequestDto);
    return this.updateUserUseCase.execute(dto);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteUserRequestDto);
    return this.deleteUserUseCase.execute(dto);
  }

  @GrpcMethod('UserService', 'ChangePassword')
  async changePassword(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, ChangePasswordUserRequestDto);
    return this.changePasswordUseCase.execute(dto);
  }
}
