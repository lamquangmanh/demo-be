import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { IUser, IDeleteSuccess, IGetOne, IPagination, IResponseSuccess, IUpdateSuccess } from '@domain/entities';
import {
  AddUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUserUseCaseAbstract,
  ListUserUseCaseAbstract,
  UpdateUserUseCaseAbstract,
} from '@domain/use-cases/users';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUseCaseAbstract,
    private readonly listUserUsecase: ListUserUseCaseAbstract,
    private readonly addUserUsecase: AddUserUseCaseAbstract,
    private readonly updateUserUsecase: UpdateUserUseCaseAbstract,
    private readonly deleteUserUsecase: DeleteUserUseCaseAbstract,
  ) {}

  @GrpcMethod('UsersService', 'Get')
  async getUser(data: IGetOne): Promise<IUser> {
    return this.getUserUsecase.execute(data.id);
  }

  @GrpcMethod('UsersService', 'List')
  async listUser(pagination: IPagination): Promise<IResponseSuccess<IUser[]> | null> {
    return this.listUserUsecase.execute(new IPagination(pagination));
  }

  @GrpcMethod('UsersService', 'Create')
  async createUser(user: IUser): Promise<IUser | null> {
    return this.addUserUsecase.execute(user);
  }

  @GrpcMethod('UsersService', 'Update')
  async updateUser(user: IUser): Promise<IUpdateSuccess | null> {
    return this.updateUserUsecase.execute(user);
  }

  @GrpcMethod('UsersService', 'Delete')
  async deleteUser(user: IUser): Promise<IDeleteSuccess | null> {
    return this.deleteUserUsecase.execute(user.id);
  }
}
