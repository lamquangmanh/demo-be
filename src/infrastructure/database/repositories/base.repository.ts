import {
  Repository,
  ObjectLiteral,
  DeepPartial,
  UpdateResult,
  DeleteResult,
} from 'typeorm';

import { BaseRepository as IBaseRepository } from '@/domain/repositories/base.repository';
import { PaginationOption, PaginationResult } from '@/domain/types';

export abstract class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findMany(filter: Partial<T>): Promise<T[]> {
    return this.repository.find({ where: filter });
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: filter });
  }

  async createOne(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async createMany(data: Partial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data as DeepPartial<T>[]);
    return this.repository.save(entities);
  }

  async updateOne(id: string, data: Partial<T>): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async softDeleteById(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  /**
   * get pagination data with filter
   * @param filter
   * @param option
   * @returns
   */
  async pagination(
    filter: Partial<T>,
    option: PaginationOption<T>,
  ): Promise<PaginationResult<T>> {
    // calculate limit and skip
    const page = option?.page ?? 1;
    const limit = option?.limit ?? 10;
    const skip = (option.page - 1) * limit;
    const take = limit;

    // get data
    const [result, total] = await this.repository.findAndCount({
      where: filter,
      skip,
      take,
      order: option?.sortBy ?? undefined,
    });

    return {
      data: result,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        itemCount: result.length,
        currentPage: page,
        currentPageLimit: limit,
      },
    };
  }
}
