// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_ROLE_REPOSITORY } from '@/common/constants';

// import from domain
import { UserRoleRepository } from '@/domain/repositories';

// import from use-case dto
import { GetPermissionsByUserResponse } from './types';

export class GetPermissionsByUserUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  async execute(userId: string): Promise<GetPermissionsByUserResponse> {
    const userRoles = await this.userRoleRepo.find({
      where: { userId },
      relations: ['role', 'role.permissions', 'role.permissions.action'],
    });

    const data: GetPermissionsByUserResponse = {
      permissions: [],
    };
    for (const userRole of userRoles) {
      for (const permission of userRole?.role?.permissions ?? []) {
        if (permission.action) {
          data.permissions.push({
            name: permission.action.name,
            requestType: permission.action.requestType,
            method: permission.action.method,
            url: permission.action.url,
          });
        }
      }
    }

    return data;
  }
}
