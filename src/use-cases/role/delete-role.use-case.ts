// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { ROLE_REPOSITORY, PERMISSION_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { RoleRepository, PermissionRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteRoleRequestDto } from './dtos';

export class DeleteRoleUseCase {
  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  async validate(input: DeleteRoleRequestDto): Promise<void> {
    // role not found
    const role = await this.roleRepo.findOne({
      roleId: input.roleId,
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

  async execute(input: DeleteRoleRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    // update the action and return the result
    const result = await this.roleRepo.softDeleteById(input.roleId, {
      deletedUserId: input.userId,
      deletedAt: new Date(),
    });

    await this.permissionRepo.softDeleteBy(
      {
        roleId: input.roleId,
      },
      {
        deletedUserId: input.userId,
        deletedAt: new Date(),
      },
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
