import { UserStatus, SortOrder, FilterOperator } from './enum';

export const ACTION_REPOSITORY = 'ACTION_REPOSITORY';
export const MODULE_REPOSITORY = 'MODULE_REPOSITORY';
export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';
export const RESOURCE_REPOSITORY = 'RESOURCE_REPOSITORY';
export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
export const USER_ROLE_REPOSITORY = 'USER_ROLE_REPOSITORY';
export const USER_REPOSITORY = 'USER_REPOSITORY';

export const USER_STATUS_MAPPING = {
  1: UserStatus.ACTIVE,
  2: UserStatus.DEACTIVATED,
  3: UserStatus.DELETED,
};

export const SORT_ORDER_MAPPING = {
  1: SortOrder.ASC,
  2: SortOrder.DESC,
};

export const FILTER_OPERATOR_MAPPING = {
  0: FilterOperator.UNSPECIFIED,
  1: FilterOperator.EQUAL,
  2: FilterOperator.NOT_EQUAL,
  3: FilterOperator.GREATER_THAN,
  4: FilterOperator.LESS_THAN,
  5: FilterOperator.GREATER_THAN_OR_EQUAL,
  6: FilterOperator.LESS_THAN_OR_EQUAL,
  7: FilterOperator.LIKE,
  8: FilterOperator.IN,
  9: FilterOperator.NOT_IN,
};
