// import from domain
import { PermissionEntity } from '../entities';
import { BaseRepository } from './base.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PermissionRepository
  extends BaseRepository<PermissionEntity> {}
