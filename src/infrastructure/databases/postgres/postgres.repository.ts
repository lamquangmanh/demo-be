import { GenericRepositoryAbstract } from '@domain/abstracts';
import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class PostgresGenericRepository<T>
  implements GenericRepositoryAbstract<T>
{
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async pagination(options?: FindManyOptions<T>) {
    return this.repository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  async find(options: FindManyOptions<T>) {
    return this.repository.find(options);
  }

  async findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return this.repository.findBy(where);
  }

  async findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return this.repository.findOneBy(where);
  }

  async create(data: T) {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(entities?: any) {
    return this.repository.save({
      ...entities,
      updated_at: new Date(),
    });
  }

  async delete(entities?: any) {
    return this.repository.delete(entities);
  }

  async increment(filter: any, field: string, value: number) {
    return this.repository.increment(filter, field, value);
  }
}
