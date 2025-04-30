// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  ACTION_REPOSITORY,
  ROLE_REPOSITORY,
  RESOURCE_REPOSITORY,
  PERMISSION_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import {
  ActionRepository,
  RoleRepository,
  ResourceRepository,
  PermissionRepository,
} from '@/domain/repositories';

// import from use-case dto
import { CreatePermissionRequestDto } from './dtos';
import { CreatePermissionSuccessResponse } from './types';

export class CreateRoleUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  async validate(input: CreatePermissionRequestDto): Promise<void> {
    // check action not exists
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

    // check role already exists
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

    // check resource already exists
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
    input: CreatePermissionRequestDto,
  ): Promise<CreatePermissionSuccessResponse> {
    await this.validate(input);

    const data = {
      ...input.permission,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };
    const permission = await this.permissionRepo.createOne(data);
    return { permission };
  }
}
