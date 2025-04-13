// import from domain
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

export type UserRepository = BaseRepository<UserEntity>;
