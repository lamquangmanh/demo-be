import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  created_at?: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updated_at?: Date;
}
