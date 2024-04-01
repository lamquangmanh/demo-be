import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { UserService } from './user.service';
import { UserDto } from './dtos';
import { DeleteSuccessDto, GetOneDto, PaginationDto, ResponseSuccessDto, UpdateSuccessDto } from 'src/common';

@Controller('users')
export class UserController {
  @Inject()
  private service: UserService;

  @GrpcMethod('UsersService', 'Get')
  async getUser(data: GetOneDto): Promise<UserDto | null> {
    return this.service.getUser(data.id);
  }

  @GrpcMethod('UsersService', 'List')
  async listUser(pagination: PaginationDto): Promise<ResponseSuccessDto<UserDto[]> | null> {
    return this.service.listUser(new PaginationDto(pagination)).then((data) => ({ total: data[1], data: data[0] }));
  }

  @GrpcMethod('UsersService', 'Create')
  async createUser(user: UserDto): Promise<UserDto | null> {
    return this.service.createUser(user);
  }

  @GrpcMethod('UsersService', 'Update')
  async updateUser(user: UserDto): Promise<UpdateSuccessDto | null> {
    return this.service.updateUser(user).then(() => ({ modifiedCount: 1 }));
  }

  @GrpcMethod('UsersService', 'Delete')
  async deleteUser(user: UserDto): Promise<DeleteSuccessDto | null> {
    return this.service.deleteUser(user).then(() => ({ deletedCount: 1 }));
  }
}
