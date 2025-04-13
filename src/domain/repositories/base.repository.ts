import { UpdateResult, DeleteResult } from 'typeorm';

// import from domain
import { PaginationOption, PaginationResult } from '../types';

export interface BaseRepository<T> {
  pagination(
    filter: Partial<T>,
    option: PaginationOption<T>,
  ): Promise<PaginationResult<T>>;
  findMany(filter: Partial<T>): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T | null>;

  createOne(data: Partial<T>): Promise<T>;
  createMany(data: Partial<T>[]): Promise<T[]>;

  updateOne(id: string, data: Partial<T>): Promise<UpdateResult>;

  deleteById(id: string): Promise<DeleteResult>;
  softDeleteById(id: string): Promise<UpdateResult>;
}
