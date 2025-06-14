import { IsNotEmpty, IsString, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}

export class UpdateProductRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => UpdateProductDto)
  product: UpdateProductDto;
}
