// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { MODULE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteModuleRequestDto } from './dtos';

export class DeleteModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  async validate(data: DeleteModuleRequestDto): Promise<void> {
    // Check if the action exists
    const module = await this.moduleRepo.findOne({
      moduleId: data.moduleId,
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
  }

  async execute(data: DeleteModuleRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // update the action and return the result
    const result = await this.moduleRepo.softDeleteById(data.moduleId, {
      deletedUserId: data.userId,
      deletedAt: new Date(),
    });
    return { success: (result?.affected ?? 0) > 0 };
  }
}
