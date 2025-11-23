// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { PRODUCT_REPOSITORY, PRODUCT_NOT_FOUND } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { ProductRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteProductRequestDto } from './dtos';

export class DeleteProductUseCase {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async validate(data: DeleteProductRequestDto): Promise<void> {
    // Check if the action exists
    const product = await this.productRepo.findOne({
      productId: data.productId,
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

  async execute(data: DeleteProductRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // update the action and return the result
    const result = await this.productRepo.softDeleteById(data.productId, {
      deletedUserId: data.userId,
      deletedAt: new Date(),
    });
    return { success: (result?.affected ?? 0) > 0 };
  }
}
