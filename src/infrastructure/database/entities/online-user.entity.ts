import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  Unique,
} from 'typeorm';

// import from domain
import { UserOnlineEntity as IUserOnlineEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';

// import from common
import { UserEntity } from './user.entity';

const ENTITY_NAME = 'online_users';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
@Unique(`UQ_${ENTITY_NAME}_user_id_socket_id`, ['userId', 'socketId'])
export class OnlineUserEntity extends BaseEntity implements IUserOnlineEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'online_user_id',
    primaryKeyConstraintName: 'PK_online_user_id',
  })
  onlineUserId: string;

  @Column('uuid', {
    name: 'user_id',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'socket_id',
  })
  socketId: string;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'current_page_url',
    nullable: true,
  })
  currentPageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.onlineUsers)
  user?: UserEntity;
}
