// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { ACTION_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ActionRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteActionRequestDto } from './dtos';

export class DeleteActionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  async validate(data: DeleteActionRequestDto): Promise<void> {
    // Check if the action exists
    const action = await this.actionRepo.findOne({
      actionId: data.actionId,
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
  }

  async execute(data: DeleteActionRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // update the action and return the result
    const result = await this.actionRepo.softDeleteById(data.actionId, {
      deletedUserId: data.userId,
      deletedAt: new Date(),
    });
    return { success: (result?.affected ?? 0) > 0 };
  }
}
