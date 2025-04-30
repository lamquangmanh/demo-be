// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { MODULE_REPOSITORY } from '@/common/constants';

// import from domain
import { ModuleRepository } from '@/domain/repositories';
import { ModuleEntity } from '@/domain/entities';

export class GetModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  async execute(moduleId: string): Promise<ModuleEntity | null> {
    return this.moduleRepo.findOne({ moduleId });
  }
}
