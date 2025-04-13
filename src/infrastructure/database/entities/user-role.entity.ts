import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import from domain
import { UserRoleEntity as IUserRoleEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

const ENTITY_NAME = 'user_roles';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Index(`IDX_${ENTITY_NAME}_user_id`, ['userId'])
@Index(`IDX_${ENTITY_NAME}_role_id`, ['roleId'])
export class UserRoleEntity extends BaseEntity implements IUserRoleEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_role_id',
    primaryKeyConstraintName: 'PK_user_role_id',
  })
  userRoleId: string;

  @Column({
    type: 'uuid',
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_user_role_user_id',
  })
  user?: UserEntity;

  @Column({
    type: 'uuid',
    name: 'role_id',
  })
  roleId: string;

  @ManyToOne(() => RoleEntity, (user) => user.userRoles)
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'FK_user_role_role_id',
  })
  role?: RoleEntity;
}
