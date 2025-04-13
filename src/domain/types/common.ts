import { FindOptionsOrder } from 'typeorm';

export type PaginationOption<T> = {
  page: number;
  limit: number;
  sortBy?: FindOptionsOrder<T>;

  search?: string;
  searchFields?: string[];
  includeDeleted?: boolean; // default is false
  withDeleted?: boolean; // default is false
  relations?: string[]; // default is []
  select?: string[]; // default is []
};

export type PaginationInfo = {
  totalItems: number;
  totalPages: number;
  itemCount: number;
  currentPage: number;
  currentPageLimit: number;
};

export type PaginationResult<T> = {
  data: T[];
  pagination: PaginationInfo;
};
