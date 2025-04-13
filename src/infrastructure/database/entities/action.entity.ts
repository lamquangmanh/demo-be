import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// import from domain
import { ActionEntity as IActionEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { ResourceEntity } from './resource.entity';
import { PermissionEntity } from './permission.entity';
import { REQUEST_TYPES } from '@/common/constants';

const ENTITY_NAME = 'actions';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Index(`IDX_${ENTITY_NAME}_resource_id`, ['resourceId'])
export class ActionEntity extends BaseEntity implements IActionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'action_id',
    primaryKeyConstraintName: 'PK_action_id',
  })
  actionId: string;

  @Column({
    type: 'uuid',
    name: 'resource_id',
  })
  resourceId: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'description',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'request_type',
  })
  requestType: REQUEST_TYPES;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'url',
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'method',
  })
  method: string;

  @ManyToOne(() => ResourceEntity, (resource) => resource.actions)
  @JoinColumn({
    name: 'resource_id',
    foreignKeyConstraintName: 'FK_action_resource_id',
  })
  resource?: ResourceEntity;

  @OneToMany(() => PermissionEntity, (permission) => permission.action)
  permissions?: PermissionEntity[];
}
