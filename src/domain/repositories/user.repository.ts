// import from domain
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

export interface UserRepository extends BaseRepository<UserEntity> {
  getUser: (id: string) => Promise<UserEntity | null>;
}
