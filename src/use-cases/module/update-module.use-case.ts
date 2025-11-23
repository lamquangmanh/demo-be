// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Not, Equal } from 'typeorm';

// import from common
import {
  MODULE_REPOSITORY,
  PRODUCT_REPOSITORY,
  MODULE_NOT_FOUND,
  MODULE_NAME_ALREADY_EXISTS,
  PRODUCT_NOT_FOUND,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleEntity } from '@/domain/entities';
import { ModuleRepository, ProductRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateModuleRequestDto } from './dtos';

export class UpdateModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async validate(input: UpdateModuleRequestDto): Promise<void> {
    // Check if the data not found
    const module = await this.moduleRepo.findOne({
      moduleId: input.module.moduleId,
    });
    if (!module) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: MODULE_NOT_FOUND.error,
        extra: {
          fields: [MODULE_NOT_FOUND],
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
        message: MODULE_NAME_ALREADY_EXISTS.error,
        extra: {
          fields: [MODULE_NAME_ALREADY_EXISTS],
        },
      });
    }

    // check product not found
    const product = await this.productRepo.findOne({
      productId: input.module.productId,
    });
    if (!product) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: PRODUCT_NOT_FOUND.error,
        extra: {
          fields: [PRODUCT_NOT_FOUND],
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
