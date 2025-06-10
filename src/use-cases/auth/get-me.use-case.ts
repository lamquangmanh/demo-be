// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_REPOSITORY, UserStatus } from '@/common/constants';

// import from domain
import { UserRepository } from '@/domain/repositories';

// import from use-case dto
import { GetMeRequestDto } from './dtos';
import { GetMeSuccessResponse } from './types';

export class GetMeUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async execute(input: GetMeRequestDto): Promise<GetMeSuccessResponse> {
    const user = await this.userRepo.findOne(
      {
        userId: input.userId,
        status: UserStatus.ACTIVE,
      },
      {
        select: ['userId', 'username', 'email', 'phone', 'avatar', 'status'],
      },
    );

    return { ...user };
  }
}
