// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Not, Equal, In, DataSource, EntityManager } from 'typeorm';
import { uniq } from 'lodash';

// import from common
import {
  MODULE_REPOSITORY,
  ROLE_REPOSITORY,
  PERMISSION_REPOSITORY,
  ACTION_REPOSITORY,
  RESOURCE_REPOSITORY,
  MODULE_NOT_FOUND,
  ROLE_NAME_ALREADY_EXISTS,
  ACTION_NOT_FOUND,
  RESOURCE_NOT_FOUND,
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
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateRoleRequestDto } from './dtos';

// import from infrastructure
import {
  PermissionEntity,
  RoleEntity,
} from '@/infrastructure/database/entities';

export class UpdateRoleUseCase {
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

  @Inject(DataSource)
  private readonly dataSource: DataSource;

  async validate(input: UpdateRoleRequestDto): Promise<void> {
    // Check if the data not found
    const module = await this.moduleRepo.findOne({
      moduleId: input.role.moduleId,
    });
    if (!module) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: MODULE_NOT_FOUND.error,
        extra: {
          fields: [MODULE_NOT_FOUND],
        },
      });
    }

    // check role already exists
    const role = await this.roleRepo.findOne({
      roleId: Not(Equal(input.role.roleId)),
      name: input.role.name,
    });
    if (role) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: ROLE_NAME_ALREADY_EXISTS.error,
        extra: {
          fields: [ROLE_NAME_ALREADY_EXISTS],
        },
      });
    }

    // check actions not found
    let actionIds = input.role.permissions.map(
      (permission) => permission.actionId,
    );
    actionIds = uniq(actionIds);
    const actions = await this.actionRepo.findMany({
      actionId: In(actionIds),
    });
    if (actionIds.length !== actions.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: ACTION_NOT_FOUND.error,
        extra: {
          fields: [ACTION_NOT_FOUND],
        },
      });
    }

    // check resource not found
    let resourceIds = input.role.permissions.map(
      (permission) => permission.resourceId,
    );
    resourceIds = uniq(resourceIds);
    const resources = await this.resourceRepo.findMany({
      resourceId: In(resourceIds),
    });
    if (resourceIds.length !== resources.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: RESOURCE_NOT_FOUND.error,
        extra: {
          fields: [RESOURCE_NOT_FOUND],
        },
      });
    }
  }

  async execute(input: UpdateRoleRequestDto): Promise<UpdateSuccessResponse> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const roleRepository = entityManager.getRepository(RoleEntity);
      const permissionRepository =
        entityManager.getRepository(PermissionEntity);

      // Validate the input
      await this.validate(input);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { permissions, ...roleData } = input.role;
      const data: Partial<RoleEntity> = {
        ...roleData,
        updatedUserId: input.userId,
      };

      // update the user and return the result
      const result = await roleRepository.update(input.role.roleId, data);

      // Extract permissionIds from the input
      const permissionIds = input.role.permissions
        .filter((item) => item.permissionId)
        .map((permission) => permission.permissionId);

      // Delete permissions in the database that are not in permissionIds
      await permissionRepository.delete({
        roleId: input.role.roleId,
        permissionId: Not(In(permissionIds)),
      });

      // Create new permissions
      const newPermissions = input.role.permissions.filter(
        (item) => !item.permissionId,
      );
      const newPermissionsData = newPermissions.map((permission) => ({
        ...permission,
        roleId: input.role.roleId,
        createdUserId: input.userId,
        updatedUserId: input.userId,
      }));
      await permissionRepository.save(newPermissionsData);

      return { success: (result?.affected ?? 0) > 0 };
    });
  }
}
