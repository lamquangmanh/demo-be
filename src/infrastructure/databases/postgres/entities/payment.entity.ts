import { Entity, Column, Index } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'payments' })
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'bigint' })
  @Index()
  user_id: number;

  @Column({ type: 'double precision' })
  amount: number;
}
