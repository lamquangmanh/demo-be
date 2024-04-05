import { UserRepositoryInterface } from '@domain/repositories';
import { EntityManager } from 'typeorm';

export abstract class DatabaseContextAbstract {
  abstract user: UserRepositoryInterface;
  abstract manager: EntityManager;
  abstract startTransaction(): Promise<void>;
  abstract commitTransaction(): Promise<void>;
  abstract rollbackTransaction(): Promise<void>;
  abstract releaseTransaction(): Promise<void>;
  abstract transaction<T>(
    callback: (transactionalEntityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
