import {
  Repository,
  ObjectLiteral,
  DeepPartial,
  UpdateResult,
  DeleteResult,
  Equal,
  Not,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ILike,
  FindOptionsOrder,
  FindOptionsWhere,
  FindOneOptions,
} from 'typeorm';
import { toString } from 'lodash';

// import from domain
import { BaseRepository as IBaseRepository } from '@/domain/repositories/base.repository';
import { PaginationOption, PaginationResult } from '@/domain/types';

// import from common
import { Filter, Sort, FilterOperator, SortOrder } from '@/common';

export abstract class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findMany(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T[]> {
    return this.repository.find({ where: filter });
  }

  async findOne(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    return this.repository.findOne({ where: filter, ...(options ?? {}) });
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

  async softDeleteById(id: string, data?: Partial<T>): Promise<UpdateResult> {
    if (!data) {
      return this.repository.softDelete(id);
    }

    return this.repository.update(id, data);
  }

  async softDeleteBy(
    filter: FindOptionsWhere<T>,
    data: Partial<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(filter, data);
  }

  convertDateToISOString(data: any): any {
    const newData: any = [];
    for (const item of data) {
      item.createdAt = item.createdAt?.toISOString();
      item.updatedAt = item.updatedAt?.toISOString();
      item.deletedAt = item.deletedAt?.toISOString();
      newData.push(item);
    }

    return newData;
  }

  /**
   * get pagination data with filter
   * @param filter
   * @param option
   * @returns
   */
  async pagination(
    filter: Filter[],
    option: PaginationOption,
  ): Promise<PaginationResult<T>> {
    // calculate limit and skip
    const page = option?.page ?? 1;
    const limit = option?.limit ?? 10;
    const skip = (option.page - 1) * limit;
    const take = limit;

    // build sort object
    const sort = this.buildSort(option.sortBy, option.sortColumns);

    // build filter object
    const filterParams = this.buildFilter(filter, option?.filterColumns ?? []);

    // get data
    const [result, total] = await this.repository.findAndCount({
      where: filterParams,
      skip,
      take,
      order: sort ?? undefined,
    });

    let newResult = result;
    // convert date to iso string
    if (option?.isConvertDate) {
      newResult = this.convertDateToISOString(result);
    }
    return {
      data: newResult,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        itemCount: result.length,
        page: page,
        limit: limit,
      },
    };
  }

  getValueOfFilter(value: any) {
    // handle other value type
    return (
      value.stringValue ||
      value.numberValue ||
      value.booleanValue ||
      value.numberValues ||
      value.stringValues ||
      value.booleanValues
    );
  }

  buildFilter(
    filterInput: Filter[],
    filterColumns: string[],
  ): FindOptionsWhere<T> {
    const filter: FindOptionsWhere<T> = {};

    for (const item of filterInput) {
      // Skip if the field is not in filterColumns or the value is invalid
      if (!filterColumns.includes(item.field)) continue;

      const condition: ObjectLiteral = {}; // Create a new condition object
      const value = this.getValueOfFilter(item);

      switch (item.operator) {
        case FilterOperator.EQUAL:
          condition[item.field] = Equal(value);
          break;
        case FilterOperator.NOT_EQUAL:
          condition[item.field] = Not(Equal(value));
          break;
        case FilterOperator.GREATER_THAN:
          condition[item.field] = MoreThan(value);
          break;
        case FilterOperator.LESS_THAN:
          condition[item.field] = LessThan(value);
          break;
        case FilterOperator.GREATER_THAN_OR_EQUAL:
          condition[item.field] = MoreThanOrEqual(value);
          break;
        case FilterOperator.LESS_THAN_OR_EQUAL:
          condition[item.field] = LessThanOrEqual(value);
          break;
        case FilterOperator.LIKE:
          // disable warning for line with type "any"

          condition[item.field] = ILike(`%${toString(value)}%`);
          break;
        case FilterOperator.IN:
          if (Array.isArray(value)) {
            condition[item.field] = In(value);
          } else {
            throw new Error(
              `FilterOperator.IN requires an array value for field "${value}".`,
            );
          }
          break;
        case FilterOperator.NOT_IN:
          if (Array.isArray(value)) {
            condition[item.field] = Not(In(value));
          } else {
            throw new Error(
              `FilterOperator.NOT_IN requires an array value for field "${value}".`,
            );
          }
          break;
        default:
          throw new Error(`Unsupported filter operator: ${item.operator}`);
      }

      // Merge the condition into the main filter object
      Object.assign(filter, condition);
    }

    return filter;
  }

  /**
   * build sort object from input
   * @param sortInput
   * @param sortColumns
   * @returns
   */
  buildSort(
    sortInput: Sort[] | undefined,
    sortColumns: string[] | undefined,
  ): FindOptionsOrder<T> {
    const sort: FindOptionsOrder<any> = {};
    if (!sortInput || !sortColumns || !Array.isArray(sortInput)) return sort;

    for (const item of sortInput) {
      // if field is not in sortColumns, skip
      if (!item?.field || !item?.order || !sortColumns.includes(item?.field))
        continue;

      switch (item.order) {
        case SortOrder.ASC:
          sort[item.field] = 'ASC';
          break;
        case SortOrder.DESC:
          sort[item.field] = 'DESC';
          break;
        default:
          break;
      }
    }
    return sort;
  }
}
