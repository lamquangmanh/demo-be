import { BaseEntity } from './base.entity';

export interface PermissionEntity extends BaseEntity {
  permissionId: string;
  roleId: string;
  resourceId: string;
  actionId: string;
}
