// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { In } from 'typeorm';

// import from common
import {
  MODULE_REPOSITORY,
  ROLE_REPOSITORY,
  PERMISSION_REPOSITORY,
  ACTION_REPOSITORY,
  RESOURCE_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import {
  ModuleRepository,
  RoleRepository,
  PermissionRepository,
  ActionRepository,
  ResourceRepository,
} from '@/domain/repositories';

// import from use-case dto
import { CreateRoleRequestDto } from './dtos';
import { CreateRoleSuccessResponse } from './types';

export class CreateRoleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  async validate(input: CreateRoleRequestDto): Promise<void> {
    // check module not exists
    const module = await this.moduleRepo.findOne({
      moduleId: input.role.moduleId,
    });
    if (!module) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Module not found',
        extra: {
          fields: [{ field: 'moduleId', error: 'Module not found' }],
        },
      });
    }

    // check role already exists
    const role = await this.roleRepo.findOne({
      name: input.role.name,
    });
    if (role) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Role name already exists',
        extra: {
          fields: [{ field: 'name', error: 'Role name already exists' }],
        },
      });
    }

    // check actions not found
    const actionIds = input.role.permissions.map(
      (permission) => permission.actionId,
    );
    const actions = await this.actionRepo.findMany({
      actionId: In(actionIds),
    });
    if (actionIds.length !== actions.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'List action not found',
        extra: {
          fields: [{ field: 'actionId', error: 'List action not found' }],
        },
      });
    }

    // check resource not found
    const resourceIds = input.role.permissions.map(
      (permission) => permission.resourceId,
    );
    const resources = await this.resourceRepo.findMany({
      resourceId: In(resourceIds),
    });
    if (resourceIds.length !== resources.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'List resource not found',
        extra: {
          fields: [{ field: 'resourceId', error: 'List resource not found' }],
        },
      });
    }
  }

  async execute(
    input: CreateRoleRequestDto,
  ): Promise<CreateRoleSuccessResponse> {
    await this.validate(input);

    // ignore list permissions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permissions, ...roleData } = input.role;
    const data = {
      ...roleData,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };
    const role = await this.roleRepo.createOne(data);

    // create permissions
    const permissionsData = input.role.permissions.map((permission) => ({
      ...permission,
      roleId: role.roleId,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    }));
    await this.permissionRepo.createMany(permissionsData);

    return { role };
  }
}
