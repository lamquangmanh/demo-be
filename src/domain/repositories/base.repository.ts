import {
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
  FindOptionsOrder,
} from 'typeorm';

// import from domain
import { PaginationOption, PaginationResult } from '../types';

// import from common
import { Filter, Sort } from '@/common';

export interface BaseRepository<T> {
  pagination(
    filter: Filter[],
    option: PaginationOption,
  ): Promise<PaginationResult<T>>;
  findMany(filter: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
  findOne(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | null>;

  createOne(data: Partial<T>): Promise<T>;
  createMany(data: Partial<T>[]): Promise<T[]>;

  updateOne(id: string, data: Partial<T>): Promise<UpdateResult>;

  deleteById(id: string): Promise<DeleteResult>;
  softDeleteById(id: string, data?: Partial<T>): Promise<UpdateResult>;
  softDeleteBy(
    filter: FindOptionsWhere<T>,
    data: Partial<T>,
  ): Promise<UpdateResult>;

  buildFilter(
    filterInput: Filter[],
    filterColumns: string[],
  ): FindOptionsWhere<T>;

  buildSort(
    sortInput: Sort[] | undefined,
    sortColumns: string[] | undefined,
  ): FindOptionsOrder<T>;
}
