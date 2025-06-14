// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  CreateProductUseCase,
  CreateProductRequestDto,
  CreateProductSuccessResponse,
  GetProductUseCase,
  GetProductsSuccessResponse,
  GetProductsUseCase,
  UpdateProductUseCase,
  UpdateProductRequestDto,
  DeleteProductUseCase,
  DeleteProductRequestDto,
} from '@/use-cases/product';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { ProductEntity } from '@/domain/entities';

@Controller()
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @GrpcMethod('ProductService', 'GetProduct')
  async getProduct({
    productId,
  }: {
    productId: string;
  }): Promise<ProductEntity | null> {
    return this.getProductUseCase.execute(productId);
  }

  @GrpcMethod('ProductService', 'GetProducts')
  async getProducts(data: any): Promise<GetProductsSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getProductsUseCase.execute(dto);
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: any): Promise<CreateProductSuccessResponse> {
    const dto = await validateDto(data, CreateProductRequestDto);
    return this.createProductUseCase.execute(dto);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: any): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateProductRequestDto);
    return this.updateProductUseCase.execute(dto);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteProductRequestDto);
    return this.deleteProductUseCase.execute(dto);
  }
}
