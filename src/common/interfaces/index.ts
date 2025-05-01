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

export interface JwtPayload {
  // payload of jwt
  exp?: number;
  iat?: number;
  iss?: string;
  sub?: string;
  aud?: string;

  userId: string;
  email: string;
}
