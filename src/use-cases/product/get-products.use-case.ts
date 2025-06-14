// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { PRODUCT_REPOSITORY } from '@/common/constants';
import { GetListRequestDto } from '@/common';

// import from domain
import { ProductRepository } from '@/domain/repositories';

// import from use-case dto
import { GetProductsSuccessResponse } from './types';

export class GetProductsUseCase {
  @Inject(PRODUCT_REPOSITORY)
  private readonly productRepo: ProductRepository;

  async execute(data: GetListRequestDto): Promise<GetProductsSuccessResponse> {
    return this.productRepo.pagination(data.filters, {
      ...data.pagination,
      sortBy: data.sorts,
      sortColumns: ['createdAt', 'updatedAt', 'name', 'productId'],
      filterColumns: ['name', 'productId'],
      isConvertDate: true,
    });
  }
}
