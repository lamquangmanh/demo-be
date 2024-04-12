import { UseCaseAbstract } from '@domain/abstracts/use-case.abstract';
import { IUser } from '@domain/entities';

export abstract class AddUserUseCaseAbstract extends UseCaseAbstract<
  IUser,
  IUser
> {}
