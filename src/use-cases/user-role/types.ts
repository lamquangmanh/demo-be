import { UserRoleEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateUserRoleSuccessResponse = {
  userRole?: UserRoleEntity;
};

export type GetUserRolesSuccessResponse = {
  pagination: PaginationInfo;
  data: UserRoleEntity[];
};
