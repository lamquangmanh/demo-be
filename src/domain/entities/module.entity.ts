import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';

export interface ModuleEntity extends BaseEntity {
  moduleId: string;
  name: string;
  description?: string;
  roles?: RoleEntity[];
}
