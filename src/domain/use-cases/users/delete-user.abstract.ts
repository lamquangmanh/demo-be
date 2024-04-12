import { UseCaseAbstract } from '@domain/abstracts/use-case.abstract';
import { IDeleteSuccess } from '@domain/entities';

export abstract class DeleteUserUseCaseAbstract extends UseCaseAbstract<
  number,
  IDeleteSuccess
> {}
