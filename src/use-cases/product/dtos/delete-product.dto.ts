import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteProductRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
