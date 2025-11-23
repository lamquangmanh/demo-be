// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { ACTION_REPOSITORY, RESOURCE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException, RESOURCE_NOT_FOUND } from '@/common';

// import from domain
import { ActionRepository, ResourceRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateActionRequestDto } from './dtos';
import { CreateActionSuccessResponse } from './types';

export class CreateActionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  async validate(data: CreateActionRequestDto): Promise<void> {
    // check resource not found
    const resource = await this.resourceRepo.findOne({
      resourceId: data.action.resourceId,
    });

    if (!resource) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: RESOURCE_NOT_FOUND.error,
        extra: {
          fields: [RESOURCE_NOT_FOUND],
        },
      });
    }
  }

  async execute(
    data: CreateActionRequestDto,
  ): Promise<CreateActionSuccessResponse> {
    await this.validate(data);

    const actionData = {
      ...data.action,
      createdUserId: data.userId,
      updatedUserId: data.userId,
    };
    const action = await this.actionRepo.createOne(actionData);
    return { action: this.actionRepo.convertDateToISOString(action) };
  }
}
