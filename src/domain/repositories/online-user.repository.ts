// import from domain
import { OnlineUserEntity } from '../entities/online-user.entity';
import { BaseRepository } from './base.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OnlineUserRepository
  extends BaseRepository<OnlineUserEntity> {}
