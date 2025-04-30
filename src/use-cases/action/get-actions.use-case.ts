// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ACTION_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { ActionRepository } from '@/domain/repositories';

// import from use-case dto
import { GetActionsSuccessResponse } from './types';

export class GetActionsUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  async execute(data: GetListRequestDto): Promise<GetActionsSuccessResponse> {
    return this.actionRepo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
      sortColumns: [
        'createdAt',
        'updatedAt',
        'resourceId',
        'requestType',
        'name',
      ],
      filterColumns: ['resourceId', 'requestType', 'name'],
      isConvertDate: true,
    });
  }
}
