import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  Unique,
} from 'typeorm';

// import from domain
import { UserEntity as IUserEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';

// import from common
import { UserStatus } from '@/common/constants';
import { UserRoleEntity } from './user-role.entity';

const ENTITY_NAME = 'users';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Unique(`UQ_${ENTITY_NAME}_email_deleted_at`, ['email', 'deletedAt'])
export class UserEntity extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    primaryKeyConstraintName: 'PK_user_id',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'user_name',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'phone',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 1000,
    name: 'avatar',
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: UserStatus,
  })
  status: UserStatus;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRoles?: UserRoleEntity[];
}
