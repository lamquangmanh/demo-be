import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';

// import from domain
import { OnlineUserEntity as IOnlineUserEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';

// import from common
import { UserEntity } from './user.entity';

const ENTITY_NAME = 'online_users';
@Entity(ENTITY_NAME)
@Unique(`UQ_${ENTITY_NAME}_user_id_socket_id`, ['userId', 'socketId'])
export class OnlineUserEntity extends BaseEntity implements IOnlineUserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'online_user_id',
    primaryKeyConstraintName: 'PK_online_user_id',
  })
  onlineUserId: string;

  @Column('uuid', {
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'socket_id',
    nullable: false,
  })
  socketId: string;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'device_info',
    nullable: true,
  })
  deviceInfo: string;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'current_page_url',
    nullable: true,
  })
  currentPageUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.onlineUsers)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_online_user_to_user',
  })
  user?: UserEntity;
}
