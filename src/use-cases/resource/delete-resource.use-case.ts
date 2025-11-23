// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { RESOURCE_REPOSITORY, ACTION_REPOSITORY } from '@/common/constants';
import { GrpcCustomException, RESOURCE_NOT_FOUND } from '@/common';

// import from domain
import { ResourceRepository, ActionRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteResourceRequestDto } from './dtos';

export class DeleteResourceUseCase {
  @Inject(RESOURCE_REPOSITORY)
  private readonly resourceRepo: ResourceRepository;

  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  async validate(input: DeleteResourceRequestDto): Promise<void> {
    // Check if the action exists
    const resource = await this.resourceRepo.findOne({
      resourceId: input.resourceId,
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
    input: DeleteResourceRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    // update the action and return the result
    const result = await this.resourceRepo.softDeleteById(input.resourceId, {
      deletedUserId: input.userId,
      deletedAt: new Date(),
    });

    await this.actionRepo.softDeleteBy(
      { resourceId: input.resourceId },
      {
        deletedUserId: input.userId,
        deletedAt: new Date(),
      },
    );

    return { success: (result?.affected ?? 0) > 0 };
  }
}
