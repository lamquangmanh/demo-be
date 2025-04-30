// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  ACTION_REPOSITORY,
  ROLE_REPOSITORY,
  PERMISSION_REPOSITORY,
  RESOURCE_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { PermissionEntity } from '@/domain/entities';
import {
  ActionRepository,
  RoleRepository,
  ResourceRepository,
  PermissionRepository,
} from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdatePermissionRequestDto } from './dtos';

export class UpdatePermissionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  async validate(input: UpdatePermissionRequestDto): Promise<void> {
    // Check if the data not found
    const action = await this.actionRepo.findOne({
      actionId: input.permission.actionId,
    });
    if (!action) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Action not found',
        extra: {
          fields: [{ field: 'actionId', error: 'Action not found' }],
        },
      });
    }

    // check role not found
    const role = await this.roleRepo.findOne({
      roleId: input.permission.roleId,
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

    // check resource not found
    const resource = await this.resourceRepo.findOne({
      resourceId: input.permission.resourceId,
    });
    if (!resource) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Resource not found',
        extra: {
          fields: [{ field: 'resourceId', error: 'Resource not found' }],
        },
      });
    }
  }

  async execute(
    input: UpdatePermissionRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    const data: Partial<PermissionEntity> = {
      ...input.permission,
      updatedUserId: input.userId,
    };

    // update the user and return the result
    const result = await this.permissionRepo.updateOne(
      input.permission.permissionId,
      data,
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
