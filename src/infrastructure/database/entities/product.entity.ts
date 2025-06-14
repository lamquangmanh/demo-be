import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

// import from domain
import { ProductEntity as IProductEntity } from '@/domain/entities';

// import from infrastructure
import { BaseEntity } from './base.entity';
import { ModuleEntity } from './module.entity';

const ENTITY_NAME = 'products';
@Entity(ENTITY_NAME)
@Index(`IDX_${ENTITY_NAME}_created_user_id`, ['createdUserId'])
@Index(`IDX_${ENTITY_NAME}_updated_user_id`, ['updatedUserId'])
@Index(`IDX_${ENTITY_NAME}_deleted_user_id`, ['deletedUserId'])
@Index(`IDX_${ENTITY_NAME}_created_at`, ['createdAt'])
@Index(`IDX_${ENTITY_NAME}_updated_at`, ['updatedAt'])
@Index(`IDX_${ENTITY_NAME}_deleted_at`, ['deletedAt'])
export class ProductEntity extends BaseEntity implements IProductEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'product_id',
    primaryKeyConstraintName: 'PK_product_id',
  })
  productId: string;

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
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'url',
  })
  url: string;

  @Column({
    type: 'varchar',
    name: 'icon',
    nullable: true,
  })
  icon: string;

  @OneToMany(() => ModuleEntity, (module) => module.product)
  modules?: ModuleEntity[];
}
