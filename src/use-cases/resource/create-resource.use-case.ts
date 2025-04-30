// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { DataSource, EntityManager } from 'typeorm';

// import from common
import { MODULE_REPOSITORY, RESOURCE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleRepository, ResourceRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateResourceRequestDto } from './dtos';
import { CreateResourceSuccessResponse } from './types';

import {
  ActionEntity,
  ResourceEntity,
} from '@/infrastructure/database/entities';

export class CreateResourceUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  @Inject(DataSource)
  private readonly dataSource: DataSource;

  async validate(input: CreateResourceRequestDto): Promise<void> {
    // check module not exists
    const module = await this.moduleRepo.findOne({
      moduleId: input.resource.moduleId,
    });
    if (!module) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Module not found',
        extra: {
          fields: [{ field: 'moduleId', error: 'Module not found' }],
        },
      });
    }

    // check resource name already exists
    const resource = await this.resourceRepo.findOne({
      name: input.resource.name,
    });
    if (resource) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Resource name already exists',
        extra: {
          fields: [{ field: 'name', error: 'Resource name already exists' }],
        },
      });
    }
  }

  async execute(
    input: CreateResourceRequestDto,
  ): Promise<CreateResourceSuccessResponse> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      await this.validate(input);

      const resourceRepository = entityManager.getRepository(ResourceEntity);
      const actionRepository = entityManager.getRepository(ActionEntity);

      // create resource
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { actions, ...resourceData } = input.resource;
      const data = resourceRepository.create({
        ...resourceData,
        createdUserId: input.userId,
        updatedUserId: input.userId,
      });
      const resource = await resourceRepository.save(data);

      // create actions of resource
      for (const action of input.resource.actions) {
        const actionData = actionRepository.create({
          ...action,
          resourceId: resource.resourceId,
          createdUserId: input.userId,
          updatedUserId: input.userId,
        });
        await actionRepository.save(actionData);
      }

      return { resource };
    });
  }
}
