// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { MODULE_REPOSITORY, PRODUCT_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ModuleRepository, ProductRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateModuleRequestDto } from './dtos';
import { CreateModuleSuccessResponse } from './types';

export class CreateModuleUseCase {
  @Inject(MODULE_REPOSITORY)
  private readonly moduleRepo: ModuleRepository;

  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

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

    // check product exists
    const product = await this.productRepo.findOne({
      productId: input.module.productId,
    });
    if (!product) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Product not found',
        extra: {
          fields: [{ field: 'productId', error: 'Product not found' }],
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
    return { module: this.moduleRepo.convertDateToISOString(module) };
  }
}
