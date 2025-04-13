import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import from domain
import { PermissionEntity as IPermissionEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
import { ResourceEntity } from './resource.entity';
import { ActionEntity } from './action.entity';

const ENTITY_NAME = 'permissions';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Index(`IDX_${ENTITY_NAME}_role_id`, ['roleId'])
@Index(`IDX_${ENTITY_NAME}_resource_id`, ['resourceId'])
@Index(`IDX_${ENTITY_NAME}_action_id`, ['actionId'])
export class PermissionEntity extends BaseEntity implements IPermissionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'permission_id',
    primaryKeyConstraintName: 'PK_permission_id',
  })
  permissionId: string;

  @Column({
    type: 'uuid',
    name: 'role_id',
  })
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'FK_permission_role_id',
  })
  role?: RoleEntity;

  @Column({
    type: 'uuid',
    name: 'resource_id',
  })
  resourceId: string;

  @ManyToOne(() => ResourceEntity, (resource) => resource.permissions)
  @JoinColumn({
    name: 'resource_id',
    foreignKeyConstraintName: 'FK_permission_resource_id',
  })
  resource?: ResourceEntity;

  @Column({
    type: 'uuid',
    name: 'action_id',
  })
  actionId: string;

  @ManyToOne(() => ActionEntity, (action) => action.permissions)
  @JoinColumn({
    name: 'action_id',
    foreignKeyConstraintName: 'FK_permission_action_id',
  })
  action?: ActionEntity;
}
