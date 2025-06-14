// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Not, Equal, In } from 'typeorm';

// import from common
import { PRODUCT_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ProductEntity } from '@/domain/entities';
import { ProductRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateProductRequestDto } from './dtos';

export class UpdateProductUseCase {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async validate(input: UpdateProductRequestDto): Promise<void> {
    // Check if the data not found
    const product = await this.productRepo.findOne({
      productId: input.product.productId,
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

    // check name already exists
    const productName = await this.productRepo.findOne({
      productId: Not(Equal(input.product.productId)),
      name: input.product.name,
    });
    if (productName) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Product name already exists',
        extra: {
          fields: [{ field: 'name', error: 'Product name already exists' }],
        },
      });
    }
  }

  async execute(
    input: UpdateProductRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    const data: Partial<ProductEntity> = {
      ...input.product,
      updatedUserId: input.userId,
    };

    // update the user and return the result
    const result = await this.productRepo.updateOne(
      input.product.productId,
      data,
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
