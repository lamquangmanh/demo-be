import { RoleEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateRoleSuccessResponse = {
  role?: RoleEntity;
};

export type GetRolesSuccessResponse = {
  pagination: PaginationInfo;
  data: RoleEntity[];
};
