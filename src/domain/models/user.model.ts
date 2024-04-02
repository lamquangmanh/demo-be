import { Entity, Column, Unique } from 'typeorm';

import { Base } from './base.model';

@Entity({ name: 'users' })
@Unique('unique_username', ['username'])
export class User extends Base {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'double precision', nullable: true, default: 0 })
  total_payment_amount: number;
}
