// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  USER_REPOSITORY,
  ROLE_REPOSITORY,
  USER_ROLE_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserRoleEntity } from '@/domain/entities';
import {
  UserRepository,
  RoleRepository,
  UserRoleRepository,
} from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateUserRoleRequestDto } from './dtos';

export class UpdateUserRoleUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  async validate(input: UpdateUserRoleRequestDto): Promise<void> {
    // user not found
    const user = await this.userRepo.findOne({
      userId: input.userRole.userId,
    });
    if (!user) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'user not found',
        extra: {
          fields: [{ field: 'userId', error: 'user not found' }],
        },
      });
    }

    // check role not found
    const role = await this.roleRepo.findOne({
      roleId: input.userRole.roleId,
    });
    if (!role) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Role not found',
        extra: {
          fields: [{ field: 'roleId', error: 'Role not found' }],
        },
      });
    }
  }

  async execute(
    input: UpdateUserRoleRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    const data: Partial<UserRoleEntity> = {
      ...input.userRole,
      updatedUserId: input.userId,
    };

    // update the user and return the result
    const result = await this.userRoleRepo.updateOne(
      input.userRole.roleId,
      data,
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
