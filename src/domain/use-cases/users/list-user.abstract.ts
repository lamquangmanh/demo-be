import { UseCaseAbstract } from '@domain/abstracts/use-case.abstract';
import { IPagination, IResponseSuccess, IUser } from '@domain/entities';

export abstract class ListUserUseCaseAbstract extends UseCaseAbstract<
  IPagination,
  IResponseSuccess<IUser[]>
> {}
