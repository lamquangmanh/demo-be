import { PostgresGenericRepository } from '../postgres.repository';
import { UserRepositoryInterface } from '@domain/repositories';
import { IUser } from '@domain/entities';

export class UserRepository extends PostgresGenericRepository<IUser> implements UserRepositoryInterface {}
