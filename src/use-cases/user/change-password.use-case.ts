// import from libraries
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { status } from '@grpc/grpc-js';

// import from common
import { USER_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserEntity } from '@/domain/entities';
import { UserRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { ChangePasswordUserRequestDto } from './dtos';

export class ChangePasswordUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async validate(data: ChangePasswordUserRequestDto): Promise<void> {
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

  async execute(
    data: ChangePasswordUserRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // Hash the password if it's being updated
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    const updatedData: Partial<UserEntity> = {
      updatedUserId: data.userId,
      password: hashedPassword,
    };

    // update the user and return the result
    const result = await this.userRepo.updateOne(data.user.userId, updatedData);

    return { success: (result?.affected ?? 0) > 0 };
  }
}
