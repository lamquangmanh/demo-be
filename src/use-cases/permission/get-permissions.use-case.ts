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
  private readonly roleRepo: PermissionRepository;

  async execute(
    data: GetListRequestDto,
  ): Promise<GetPermissionsSuccessResponse> {
    return this.roleRepo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
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
