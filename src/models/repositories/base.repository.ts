import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  protected repository: Repository<T>;

  async pagination() {}

  async findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
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

  async updateOne(filter: any, update: any) {
    return this.repository.update(filter, update);
  }

  async increment(filter: any, field: string, value: number) {
    return this.repository.increment(filter, field, value);
  }
}
