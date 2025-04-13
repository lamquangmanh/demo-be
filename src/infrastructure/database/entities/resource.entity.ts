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
import { ResourceEntity as IResourceEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { ActionEntity } from './action.entity';
import { ModuleEntity } from './module.entity';
import { PermissionEntity } from './permission.entity';

const ENTITY_NAME = 'resources';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Index(`IDX_${ENTITY_NAME}_module_id`, ['moduleId'])
export class ResourceEntity extends BaseEntity implements IResourceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'resource_id',
    primaryKeyConstraintName: 'PK_resource_id',
  })
  resourceId: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'uuid',
    name: 'module_id',
  })
  moduleId: string;

  @ManyToOne(() => ModuleEntity, (module) => module.resources)
  @JoinColumn({
    name: 'module_id',
    foreignKeyConstraintName: 'FK_resource_module_id',
  })
  module?: ModuleEntity;

  @OneToMany(() => ActionEntity, (action) => action.resource)
  actions?: ActionEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.resource)
  permissions?: PermissionEntity[];
}
