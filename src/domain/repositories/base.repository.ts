import {
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
  FindOptionsOrder,
  FindOneOptions,
  FindManyOptions,
  InsertResult,
} from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import type { UpsertOptions } from 'typeorm/repository/UpsertOptions';

// import from domain
import { PaginationOption, PaginationResult } from '../types';

// import from common
import { Filter, Sort } from '@/common';

export interface BaseRepository<T> {
  pagination(
    filter: Filter[],
    option: PaginationOption,
  ): Promise<PaginationResult<T>>;
  find(options: FindManyOptions<T> | undefined): Promise<T[]>;
  findMany(filter: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
  findOne(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    options?: FindOneOptions<T>,
  ): Promise<T | null>;

  createOne(data: Partial<T>): Promise<T>;
  createMany(data: Partial<T>[]): Promise<T[]>;

  updateOne(id: string, data: Partial<T>): Promise<UpdateResult>;
  upsert(
    entityOrEntities: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
    conflictPathsOrOptions: string[] | UpsertOptions<T>,
  ): Promise<InsertResult>;

  deleteById(id: string): Promise<DeleteResult>;
  deleteBy(filter: FindOptionsWhere<T>): Promise<DeleteResult>;
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
  convertDateToISOString(data: any): any;
}
