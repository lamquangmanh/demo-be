import { BaseEntity } from './base.entity';
import { ModuleEntity } from './module.entity';
import { PermissionEntity } from './permission.entity';

export interface RoleEntity extends BaseEntity {
  roleId: string;
  name: string;
  description?: string;
  moduleId: string;
  module?: ModuleEntity;
  permissions?: PermissionEntity[];
}
