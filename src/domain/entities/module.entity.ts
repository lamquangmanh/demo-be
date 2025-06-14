import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
import { ProductEntity } from './product.entity';

export interface ModuleEntity extends BaseEntity {
  moduleId: string;
  name: string;
  url?: string;
  description?: string;
  icon?: string;
  roles?: RoleEntity[];
  productId?: string;
  product?: ProductEntity;
}
