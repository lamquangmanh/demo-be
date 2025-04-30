// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_ROLE_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { UserRoleRepository } from '@/domain/repositories';

// import from use-case dto
import { GetUserRolesSuccessResponse } from './types';

export class GetUserRolesUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly repo: UserRoleRepository;

  async execute(data: GetListRequestDto): Promise<GetUserRolesSuccessResponse> {
    return this.repo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
      sortColumns: ['createdAt', 'updatedAt', 'roleId', 'userId'],
      filterColumns: ['roleId', 'userId'],
      isConvertDate: true,
    });
  }
}
