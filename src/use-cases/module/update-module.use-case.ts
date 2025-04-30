// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Not, Equal } from 'typeorm';

// import from common
import { MODULE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleEntity } from '@/domain/entities';
import { ModuleRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateModuleRequestDto } from './dtos';

export class UpdateModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  async validate(input: UpdateModuleRequestDto): Promise<void> {
    // Check if the data not found
    const module = await this.moduleRepo.findOne({
      moduleId: input.module.moduleId,
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

    // check module name already exists
    const moduleName = await this.moduleRepo.findOne({
      moduleId: Not(Equal(input.module.moduleId)),
      name: input.module.name,
    });
    if (moduleName) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Module name already exists',
        extra: {
          fields: [{ field: 'name', error: 'Module name already exists' }],
        },
      });
    }
  }

  async execute(input: UpdateModuleRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    const data: Partial<ModuleEntity> = {
      ...input.module,
      updatedUserId: input.userId,
    };

    // update the user and return the result
    const result = await this.moduleRepo.updateOne(input.module.moduleId, data);
    return { success: (result?.affected ?? 0) > 0 };
  }
}
