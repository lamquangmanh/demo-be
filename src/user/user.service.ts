import { Inject, Injectable } from '@nestjs/common';

import { UserEntity, UserRepository } from '../models';
import { PaginationDto } from 'src/common';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  public userRepository: UserRepository;

  async getUser(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }

  async createUser(user: UserEntity | any): Promise<UserEntity> {
    return this.userRepository.create(user);
  }

  async listUser(pagination: PaginationDto): Promise<[UserEntity[], number]> {
    return this.userRepository.pagination({
      ...pagination.getOptions(),
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }

  async updateUser(user: UserEntity | any): Promise<UserEntity> {
    return this.userRepository.update(user);
  }

  async deleteUser(user: UserEntity | any): Promise<DeleteResult> {
    return this.userRepository.delete({
      id: user.id,
    });
  }
}
