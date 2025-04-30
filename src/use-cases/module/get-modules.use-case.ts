// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { MODULE_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { ModuleRepository } from '@/domain/repositories';

// import from use-case dto
import { GetModulesSuccessResponse } from './types';

export class GetModulesUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  async execute(data: GetListRequestDto): Promise<GetModulesSuccessResponse> {
    return this.moduleRepo.pagination(data.filter, {
      ...data.pagination,
      sortBy: data.sort,
      sortColumns: ['createdAt', 'updatedAt', 'name'],
      filterColumns: ['name'],
      isConvertDate: true,
    });
  }
}
