// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ROLE_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { RoleRepository } from '@/domain/repositories';

// import from use-case dto
import { GetRolesSuccessResponse } from './types';

export class GetRolesUseCase {
  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  async execute(data: GetListRequestDto): Promise<GetRolesSuccessResponse> {
    return this.roleRepo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
      sortColumns: ['createdAt', 'updatedAt', 'name', 'moduleId'],
      filterColumns: ['name', 'moduleId'],
      isConvertDate: true,
    });
  }
}
