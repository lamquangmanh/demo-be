// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { MODULE_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateModuleRequestDto } from './dtos';
import { CreateModuleSuccessResponse } from './types';

export class CreateModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  async validate(input: CreateModuleRequestDto): Promise<void> {
    // check module not exists
    const module = await this.moduleRepo.findOne({
      name: input.module.name,
    });
    if (module) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Module name already exists',
        extra: {
          fields: [{ field: 'name', error: 'Module name already exists' }],
        },
      });
    }
  }

  async execute(
    input: CreateModuleRequestDto,
  ): Promise<CreateModuleSuccessResponse> {
    await this.validate(input);

    const data = {
      ...input.module,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };
    const module = await this.moduleRepo.createOne(data);
    return { module };
  }
}
