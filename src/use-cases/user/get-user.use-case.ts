// import from libraries
import { Inject } from '@nestjs/common';
import { omit } from 'lodash';

// import from common
import { USER_REPOSITORY } from '@/common/constants';

// import from domain
import { UserRepository } from '@/domain/repositories';

// import from use-case dto
import { GetUserSuccessResponse } from './types';

export class GetUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async execute(userId: string): Promise<GetUserSuccessResponse> {
    // get user
    const user = await this.userRepo.findOne({ userId });
    return { ...omit(user, ['password']) };
  }
}
