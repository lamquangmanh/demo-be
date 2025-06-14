import { BaseEntity } from './base.entity';
import { ModuleEntity } from './module.entity';

export interface ProductEntity extends BaseEntity {
  productId: string;
  name: string;
  description: string;
  url: string;
  icon?: string;

  modules?: ModuleEntity[];
}
