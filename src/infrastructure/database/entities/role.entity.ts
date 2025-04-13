import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import from domain
import { RoleEntity as IRoleEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { UserRoleEntity } from './user-role.entity';
import { PermissionEntity } from './permission.entity';
import { ModuleEntity } from './module.entity';

const ENTITY_NAME = 'roles';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Index(`IDX_${ENTITY_NAME}_module_id`, ['moduleId'])
export class RoleEntity extends BaseEntity implements IRoleEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'role_id',
    primaryKeyConstraintName: 'PK_role_id',
  })
  roleId: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'uuid',
    name: 'module_id',
  })
  moduleId: string;

  @ManyToOne(() => ModuleEntity, (module) => module.resources)
  @JoinColumn({
    name: 'module_id',
    foreignKeyConstraintName: 'FK_role_module_id',
  })
  module?: ModuleEntity;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles?: UserRoleEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.role)
  permissions?: PermissionEntity[];
}
