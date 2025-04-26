// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { UserRepository } from '@/domain/repositories';

// import from use-case dto
import { GetUserSuccessResponse } from './types';

export class GetUsersUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async execute(data: GetListRequestDto): Promise<GetUserSuccessResponse> {
    return this.userRepo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
      sortColumns: [
        'createdAt',
        'updatedAt',
        'username',
        'email',
        'status',
        'phone',
      ],
      filterColumns: ['username', 'email', 'status'],
      isConvertDate: true,
    });
  }
}
