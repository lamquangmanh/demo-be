// import from libraries
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { status } from '@grpc/grpc-js';

// import from common
import {
  USER_REPOSITORY,
  UserStatus,
  USER_STATUS_MAPPING,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserEntity } from '@/domain/entities';
import { UserRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateUserRequestDto } from './dtos';

export class UpdateUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async validate(data: UpdateUserRequestDto): Promise<void> {
    // Check if the user exists
    const user = await this.userRepo.findOne({
      userId: data.user.userId,
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

  async execute(data: UpdateUserRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // Hash the password if it's being updated
    const updatedData: Partial<UserEntity> = { updatedUserId: data.userId };
    if (data.user.password) {
      const hashedPassword = await bcrypt.hash(data.user.password, 10);
      updatedData.password = hashedPassword;
    }
    if (data.user.phone) {
      updatedData.phone = data.user.phone;
    }
    if (data.user.avatar) {
      updatedData.avatar = data.user.avatar;
    }
    if (data.user.username) {
      updatedData.username = data.user.username;
    }
    if (data.user.status) {
      updatedData.status = data.user.status;
      if (updatedData.status === UserStatus.DELETED) {
        updatedData.deletedAt = new Date();
        updatedData.deletedUserId = data.userId;
      }
    }

    // update the user and return the result
    const result = await this.userRepo.updateOne(data.user.userId, updatedData);
    return { success: (result?.affected ?? 0) > 0 };
  }
}
