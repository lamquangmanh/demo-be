export enum UserStatusInput {
  UNSPECIFIED = 0,
  ACTIVE = 1,
  DEACTIVATED = 2,
  DELETED = 3,
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  DELETED = 'DELETED',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
}

export enum RequestType {
  VIEW = 'VIEW',
  HTTP = 'HTTP',
  GRAPHQL = 'GRAPHQL',
  GRPC = 'GRPC',
  WEBSOCKET = 'WEBSOCKET',
}

export enum SortOrderInput {
  UNSPECIFIED = 0,
  ASC = 1,
  DESC = 2,
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FilterOperatorInput {
  UNSPECIFIED = 0,
  EQUAL = 1,
  NOT_EQUAL = 2,
  GREATER_THAN = 3,
  LESS_THAN = 4,
  GREATER_THAN_OR_EQUAL = 5,
  LESS_THAN_OR_EQUAL = 6,
  LIKE = 7,
  IN = 8,
  NOT_IN = 9,
}

export enum FilterOperator {
  UNSPECIFIED = 'UNSPECIFIED',
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  LIKE = 'LIKE',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}
