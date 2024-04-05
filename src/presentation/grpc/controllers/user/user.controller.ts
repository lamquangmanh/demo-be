import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  IUser,
  IDeleteSuccess,
  IGetOne,
  IPagination,
  IResponseSuccess,
  IUpdateSuccess,
} from '@domain/entities';
import {
  AddUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUserUseCaseAbstract,
  ListUserUseCaseAbstract,
  UpdateUserUseCaseAbstract,
} from '@domain/use-cases/users';
import { GlobalException } from '@presentation/grpc/common/exceptions/global.exception';

@Controller('users')
@UseFilters(new GlobalException())
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUseCaseAbstract,
    private readonly listUserUsecase: ListUserUseCaseAbstract,
    private readonly addUserUsecase: AddUserUseCaseAbstract,
    private readonly updateUserUsecase: UpdateUserUseCaseAbstract,
    private readonly deleteUserUsecase: DeleteUserUseCaseAbstract,
  ) {}

  @GrpcMethod('UsersService', 'GetUser')
  async getUser(data: IGetOne): Promise<IUser> {
    return this.getUserUsecase.execute(data.id);
  }

  @GrpcMethod('UsersService', 'ListUser')
  async listUser(pagination: IPagination): Promise<IResponseSuccess<IUser[]>> {
    return this.listUserUsecase.execute(new IPagination(pagination));
  }

  @GrpcMethod('UsersService', 'AddUser')
  async createUser(user: IUser): Promise<IUser> {
    return this.addUserUsecase.execute(user);
  }

  @GrpcMethod('UsersService', 'UpdateUser')
  async updateUser(user: IUser): Promise<IUpdateSuccess> {
    return this.updateUserUsecase.execute(user);
  }

  @GrpcMethod('UsersService', 'DeleteUser')
  async deleteUser(user: IUser): Promise<IDeleteSuccess> {
    return this.deleteUserUsecase.execute(user.id);
  }
}
