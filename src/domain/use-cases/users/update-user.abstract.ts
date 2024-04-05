import { UseCaseAbstract } from '@domain/abstracts/use-case.abstract';
import { IUpdateSuccess, IUser } from '@domain/entities';

export abstract class UpdateUserUseCaseAbstract extends UseCaseAbstract<
  IUser,
  IUpdateSuccess
> {}
