import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// import from domain
import { BaseEntity as IBaseEntity } from '@/domain/entities';

export class BaseEntity implements IBaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    name: 'created_user_id',
  })
  createdUserId: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    name: 'updated_user_id',
  })
  updatedUserId: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    type: 'varchar',
    name: 'deleted_user_id',
    nullable: true,
  })
  deletedUserId?: string;
}
