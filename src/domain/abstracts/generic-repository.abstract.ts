import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export abstract class GenericRepositoryAbstract<T> {
  abstract pagination(options?: FindManyOptions<T>);
  abstract findOne(options: FindOneOptions<T>);
  abstract find(options: FindManyOptions<T>);
  abstract find(options: FindManyOptions<T>);
  abstract findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]);
  abstract create(data: T);
  abstract update(entities?: any);
  abstract delete(entities?: any);
  abstract increment(filter: any, field: string, value: number);
}
