import { FilterOperator, SortOrder } from '../constants';

export interface Filter {
  field: string;
  operator: FilterOperator;
  numberValue?: number;
  stringValue?: string;
  booleanValue?: boolean;
  numberValues?: number[];
  stringValues?: string[];
  booleanValues?: boolean[];
}

export interface Sort {
  field: string;
  order: SortOrder;
}
