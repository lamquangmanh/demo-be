import { Sort } from '@/common';

export type PaginationOption = {
  page: number;
  limit: number;

  // fields using to sort
  sortBy?: Sort[];
  // list columns using to sort
  sortColumns?: string[];

  // fields using to filter
  filterColumns?: string[];

  includeDeleted?: boolean; // default is false
  relations?: string[]; // default is []
  select?: string[]; // default is []

  isConvertDate?: boolean; // default is false
};

export type PaginationInfo = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  itemCount: number;
};

export type PaginationResult<T> = {
  data: T[];
  pagination: PaginationInfo;
};

export type UpdateSuccessResponse = {
  success: boolean;
};

export type DeleteSuccessResponse = {
  success: boolean;
};

export type ErrorResponse = {
  code: number;
  message: string;
  extra?: any;
};
