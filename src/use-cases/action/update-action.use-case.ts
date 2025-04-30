// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { ACTION_REPOSITORY, RESOURCE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ActionEntity } from '@/domain/entities';
import { ActionRepository, ResourceRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateActionRequestDto } from './dtos';

export class UpdateActionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  async validate(data: UpdateActionRequestDto): Promise<void> {
    // Check if the action exists
    const action = await this.actionRepo.findOne({
      actionId: data.action.actionId,
    });
    if (!action) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Action not found',
        extra: {
          fields: [{ field: 'actionId', error: 'Action not found' }],
        },
      });
    }

    // check resource not found
    const resource = await this.resourceRepo.findOne({
      resourceId: data.action.resourceId,
    });

    if (!resource) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Resource not found',
        extra: {
          fields: [{ field: 'resourceId', error: 'Resource not found' }],
        },
      });
    }
  }

  async execute(data: UpdateActionRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // Hash the password if it's being updated
    const updatedData: Partial<ActionEntity> = {
      ...data.action,
      updatedUserId: data.userId,
    };

    // update the user and return the result
    const result = await this.actionRepo.updateOne(
      data.action.actionId,
      updatedData,
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
