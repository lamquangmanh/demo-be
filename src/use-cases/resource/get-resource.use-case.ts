// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { RESOURCE_REPOSITORY } from '@/common/constants';

// import from domain
import { ResourceRepository } from '@/domain/repositories';
import { ResourceEntity } from '@/domain/entities';

export class GetResourceUseCase {
  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  async execute(resourceId: string): Promise<ResourceEntity | null> {
    return this.resourceRepo.findOne({ resourceId });
  }
}
