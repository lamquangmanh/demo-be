import { Entity, Column, Unique } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
@Unique('unique_username', ['username'])
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'double precision', nullable: true, default: 0 })
  total_payment_amount: number;
}
