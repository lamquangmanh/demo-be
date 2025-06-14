import { PermissionEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreatePermissionSuccessResponse = {
  permission?: PermissionEntity;
};

export type GetPermissionsSuccessResponse = {
  pagination: PaginationInfo;
  data: PermissionEntity[];
};

export interface PermissionInfo {
  name: string;
  requestType: string;
  method: string;
  url: string;
}

export type GetPermissionsByUserResponse = {
  permissions: PermissionInfo[];
};
