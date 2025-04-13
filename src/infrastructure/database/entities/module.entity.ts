import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

// import from domain
import { ModuleEntity as IModuleEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { ResourceEntity } from './resource.entity';
import { RoleEntity } from './role.entity';

const ENTITY_NAME = 'modules';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
export class ModuleEntity extends BaseEntity implements IModuleEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'module_id',
    primaryKeyConstraintName: 'PK_module_id',
  })
  moduleId: string;

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

  @OneToMany(() => ResourceEntity, (resource) => resource.module)
  resources?: ResourceEntity[];

  @OneToMany(() => RoleEntity, (role) => role.module)
  roles?: RoleEntity[];
}
