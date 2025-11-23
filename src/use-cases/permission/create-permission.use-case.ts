// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  ACTION_REPOSITORY,
  ROLE_REPOSITORY,
  RESOURCE_REPOSITORY,
  PERMISSION_REPOSITORY,
  ACTION_NOT_FOUND,
  ROLE_NOT_FOUND,
  RESOURCE_NOT_FOUND,
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
        message: ACTION_NOT_FOUND.error,
        extra: {
          fields: [ACTION_NOT_FOUND],
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
        message: ROLE_NOT_FOUND.error,
        extra: {
          fields: [ROLE_NOT_FOUND],
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
        message: RESOURCE_NOT_FOUND.error,
        extra: {
          fields: [RESOURCE_NOT_FOUND],
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
    return {
      permission: this.permissionRepo.convertDateToISOString(permission),
    };
  }
}
