// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { USER_ROLE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserRoleRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteUserRoleRequestDto } from './dtos';

export class DeleteUserRoleUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly repo: UserRoleRepository;

  async validate(input: DeleteUserRoleRequestDto): Promise<void> {
    // user role not found
    const userRole = await this.repo.findOne({
      userRoleId: input.userRoleId,
    });
    if (!userRole) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'User role not found',
        extra: {
          fields: [{ field: 'resourceId', error: 'User role not found' }],
        },
      });
    }
  }

  async execute(
    input: DeleteUserRoleRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    // update the action and return the result
    const result = await this.repo.softDeleteById(input.userRoleId, {
      deletedUserId: input.userId,
      deletedAt: new Date(),
    });
    return { success: (result?.affected ?? 0) > 0 };
  }
}
