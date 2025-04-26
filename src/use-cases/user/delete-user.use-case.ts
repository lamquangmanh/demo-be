// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { USER_REPOSITORY, UserStatus } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteUserRequestDto } from './dtos';

export class DeleteUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async validate(data: DeleteUserRequestDto): Promise<void> {
    // Check if the user exists
    const user = await this.userRepo.findOne({
      userId: data.userId,
    });
    if (!user) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'User not found',
        extra: {
          fields: [{ field: 'userId', error: 'User not found' }],
        },
      });
    }
  }

  async execute(data: DeleteUserRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // update the user and return the result
    const result = await this.userRepo.softDeleteById(data.userId, {
      status: UserStatus.DELETED,
      deletedUserId: data.deletedUserId,
      deletedAt: new Date(),
    });
    return { success: (result?.affected ?? 0) > 0 };
  }
}
