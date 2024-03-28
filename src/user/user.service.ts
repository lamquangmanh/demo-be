import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../models';
import { UserDto } from './dtos';
import { DeleteSuccessDto, PaginationDto, ResponseSuccessDto, UpdateSuccessDto } from 'src/common';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  public userRepository: UserRepository;

  async getUser(userId: number): Promise<UserDto | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }

  async createUser(user: UserDto): Promise<UserDto | null> {
    return this.userRepository.create({
      name: user.name,
      username: user.username,
      password: '123456789',
      total_payment_amount: 0,
    });
  }

  async listUser(pagination: PaginationDto): Promise<ResponseSuccessDto<UserDto[]> | null> {
    return this.userRepository.findBy({
      ...pagination.getOptions(),
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }

  async updateUser(user: UserDto): Promise<UpdateSuccessDto | null> {
    return this.userRepository.updateOne(
      {
        id: user.id,
      },
      user,
    );
  }

  async deleteUser(user: UserDto): Promise<DeleteSuccessDto | null> {
    return this.userRepository.updateOne(
      {
        id: user.id,
      },
      {
        deletedAt: new Date(),
      },
    );
  }
}
