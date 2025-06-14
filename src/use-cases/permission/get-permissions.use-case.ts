// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { PERMISSION_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { PermissionRepository } from '@/domain/repositories';

// import from use-case dto
import { GetPermissionsSuccessResponse } from './types';

export class GetPermissionsUseCase {
  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  async execute(
    data: GetListRequestDto,
  ): Promise<GetPermissionsSuccessResponse> {
    return this.permissionRepo.pagination(data.filters, {
      ...data.pagination,
      sortBy: data.sorts,
      sortColumns: [
        'createdAt',
        'updatedAt',
        'resourceId',
        'actionId',
        'roleId',
      ],
      filterColumns: ['resourceId', 'actionId', 'roleId'],
      isConvertDate: true,
    });
  }
}
