import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import {
  CreateProductUseCase,
  GetProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@/use-cases/product';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductUseCase,
    GetProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
