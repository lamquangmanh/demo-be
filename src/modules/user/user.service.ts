import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../../models';
import { UserDto } from './dtos';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  public userRepository: UserRepository;

  async getUser(userId: number): Promise<UserDto | null> {
    // get user information
    return this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }
}
