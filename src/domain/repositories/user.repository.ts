import { GenericRepositoryAbstract } from '@domain/abstracts';
import { IUser } from '@domain/entities';

export abstract class UserRepositoryInterface extends GenericRepositoryAbstract<IUser> {}
