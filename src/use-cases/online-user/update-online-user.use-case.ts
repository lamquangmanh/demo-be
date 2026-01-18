// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  USER_REPOSITORY,
  USER_NOT_FOUND,
  ONLINE_USER_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { OnlineUserEntity } from '@/domain/entities';
import { UserRepository, OnlineUserRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateOnlineUserRequestDto } from './dtos';

export class UpdateOnlineUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(ONLINE_USER_REPOSITORY)
  private readonly onlineUserRepository: OnlineUserRepository;

  async validate(input: UpdateOnlineUserRequestDto): Promise<void> {
    // user not found
    const user = await this.userRepo.findOne({
      userId: input.onlineUser.userId,
    });
    if (!user) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: USER_NOT_FOUND.error,
        extra: {
          fields: [USER_NOT_FOUND],
        },
      });
    }
  }

  async execute(
    input: UpdateOnlineUserRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    const data: Partial<OnlineUserEntity> = {
      ...input.onlineUser,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };

    // update the user and return the result
    const result = await this.onlineUserRepository.upsert(data, {
      conflictPaths: ['userId', 'socketId'],
    });
    return { success: (result.identifiers.length ?? 0) > 0 };
  }
}
