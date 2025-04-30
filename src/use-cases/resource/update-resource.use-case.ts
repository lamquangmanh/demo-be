// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Not, Equal, In, DataSource, EntityManager } from 'typeorm';

// import from common
import {
  RESOURCE_REPOSITORY,
  MODULE_REPOSITORY,
  ACTION_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ResourceEntity as ResourceEntityType } from '@/domain/entities';
import {
  ResourceRepository,
  ModuleRepository,
  ActionRepository,
} from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateResourceRequestDto, UpdateResourceActionDto } from './dtos';

// import from infrastructure
import {
  ActionEntity,
  ResourceEntity,
} from '@/infrastructure/database/entities';

export class UpdateResourceUseCase {
  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(DataSource)
  private readonly dataSource: DataSource;

  async validate(input: UpdateResourceRequestDto): Promise<void> {
    // Check if the data not found
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
      resourceId: Not(Equal(input.resource.resourceId)),
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

    // list of actions not found
    const listActionExists = input.resource.actions.filter(
      (action: UpdateResourceActionDto) => action.actionId,
    );
    const actionIds = listActionExists.map(
      (action: UpdateResourceActionDto) => action.actionId,
    );
    const actions = await this.actionRepo.findMany({
      actionId: In(actionIds),
    });
    if (actions.length < listActionExists.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Action not found',
        extra: {
          fields: [{ field: 'actionId', error: 'Action not found' }],
        },
      });
    }
  }

  async execute(
    input: UpdateResourceRequestDto,
  ): Promise<UpdateSuccessResponse> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      // Validate the input
      await this.validate(input);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { actions, ...resourceData } = input.resource;
      const data: Partial<ResourceEntityType> = {
        ...resourceData,
        updatedUserId: input.userId,
      };

      const resourceRepository = entityManager.getRepository(ResourceEntity);
      const actionRepository = entityManager.getRepository(ActionEntity);

      // update the user and return the result
      const result = await resourceRepository.update(
        input.resource.resourceId,
        data,
      );

      // Extract actionIds from the input
      const actionIds = input.resource.actions
        .filter((item: UpdateResourceActionDto) => item.actionId)
        .map((action: UpdateResourceActionDto) => action.actionId);

      // Delete actions in the database that are not in actionIds
      await actionRepository.update(
        {
          resourceId: input.resource.resourceId,
          actionId: Not(In(actionIds)),
        },
        {
          deletedUserId: input.userId,
          deletedAt: new Date(),
        },
      );

      // Update existing actions in actionIds
      for (const action of input.resource.actions) {
        if (action.actionId) {
          await actionRepository.update(action.actionId, {
            ...action,
            updatedUserId: input.userId,
          });
        }
      }
      // Create new actions that are not in the database
      const newActions = input.resource.actions.filter(
        (action: UpdateResourceActionDto) => !action.actionId,
      );

      for (const newAction of newActions) {
        const actionData = actionRepository.create({
          ...newAction,
          resourceId: input.resource.resourceId,
          createdUserId: input.userId,
          updatedUserId: input.userId,
        });
        await actionRepository.save(actionData);
      }

      return { success: (result?.affected ?? 0) > 0 };
    });
  }
}
