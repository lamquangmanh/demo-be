import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

export interface UserRoleEntity extends BaseEntity {
  userRoleId: string;
  userId: string;
  user?: UserEntity;
  roleId: string;
  role?: RoleEntity;
}
