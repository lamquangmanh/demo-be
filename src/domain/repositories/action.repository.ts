// import from domain
import { ActionEntity } from '../entities/action.entity';
import { BaseRepository } from './base.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ActionRepository extends BaseRepository<ActionEntity> {}
