import { ProductEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateProductSuccessResponse = {
  product?: ProductEntity;
};

export type GetProductsSuccessResponse = {
  pagination: PaginationInfo;
  data: ProductEntity[];
};
