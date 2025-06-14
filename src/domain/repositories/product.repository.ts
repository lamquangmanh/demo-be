// import from domain
import { ProductEntity } from '../entities';
import { BaseRepository } from './base.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProductRepository extends BaseRepository<ProductEntity> {}
