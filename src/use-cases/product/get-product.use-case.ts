// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { PRODUCT_REPOSITORY } from '@/common/constants';

// import from domain
import { ProductRepository } from '@/domain/repositories';
import { ProductEntity } from '@/domain/entities';

export class GetProductUseCase {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async execute(productId: string): Promise<ProductEntity | null> {
    const result = await this.productRepo.findOne({ productId });
    return this.productRepo.convertDateToISOString(result);
  }
}
