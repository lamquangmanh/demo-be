// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { RESOURCE_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { ResourceRepository } from '@/domain/repositories';

// import from use-case dto
import { GetResourcesSuccessResponse } from './types';

export class GetResourcesUseCase {
  @Inject(RESOURCE_REPOSITORY)
  private readonly moduleRepo: ResourceRepository;

  async execute(data: GetListRequestDto): Promise<GetResourcesSuccessResponse> {
    return this.moduleRepo.pagination(data.filters, {
      ...data.pagination,
      sortBy: data.sorts,
      sortColumns: ['createdAt', 'updatedAt', 'name', 'moduleId'],
      filterColumns: ['name', 'moduleId'],
      isConvertDate: true,
    });
  }
}
