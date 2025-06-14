import { BaseEntity } from './base.entity';
import { ActionEntity } from './action.entity';
import { ResourceEntity } from './resource.entity';

export interface PermissionEntity extends BaseEntity {
  permissionId: string;
  roleId: string;
  resourceId: string;
  actionId: string;
  action?: ActionEntity;
  resource?: ResourceEntity;
}
