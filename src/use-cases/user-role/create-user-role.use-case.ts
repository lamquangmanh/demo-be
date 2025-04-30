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
import {
  UserRepository,
  RoleRepository,
  UserRoleRepository,
} from '@/domain/repositories';

// import from use-case dto
import { CreateUserRoleRequestDto } from './dtos';
import { CreateUserRoleSuccessResponse } from './types';

export class CreateUserRoleUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  async validate(input: CreateUserRoleRequestDto): Promise<void> {
    // check user not found
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
    input: CreateUserRoleRequestDto,
  ): Promise<CreateUserRoleSuccessResponse> {
    await this.validate(input);

    const data = {
      ...input.userRole,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };
    const userRole = await this.userRoleRepo.createOne(data);
    return { userRole };
  }
}
