// import from libraries
import { Inject } from '@nestjs/common';
import { omit } from 'lodash';

// import from common
import { USER_REPOSITORY } from '@/common/constants';

// import from domain
import { UserRepository } from '@/domain/repositories';
import { UserEntity } from '@/domain/entities';

export class GetUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async execute(userId: string): Promise<UserEntity | null> {
    // get user
    const user = await this.userRepo.findOne({ userId });
    return { ...omit(user, ['password']) };
  }
}
