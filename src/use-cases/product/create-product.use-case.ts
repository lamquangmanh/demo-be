// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import {
  PRODUCT_REPOSITORY,
  PRODUCT_NAME_ALREADY_EXISTS,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ProductRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateProductRequestDto } from './dtos';
import { CreateProductSuccessResponse } from './types';

export class CreateProductUseCase {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async validate(input: CreateProductRequestDto): Promise<void> {
    // check product not exists
    const product = await this.productRepo.findOne({
      name: input.product.name,
    });
    if (product) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: PRODUCT_NAME_ALREADY_EXISTS.error,
        extra: {
          fields: [PRODUCT_NAME_ALREADY_EXISTS],
        },
      });
    }
  }

  async execute(
    input: CreateProductRequestDto,
  ): Promise<CreateProductSuccessResponse> {
    await this.validate(input);

    // create product
    const data = {
      ...input.product,
      createdUserId: input.userId,
      updatedUserId: input.userId,
    };
    const product = await this.productRepo.createOne(data);
    return { product: this.productRepo.convertDateToISOString(product) };
  }
}
