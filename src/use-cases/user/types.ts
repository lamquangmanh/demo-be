import { UserEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateUserSuccessResponse = {
  user?: Omit<UserEntity, 'password'>;
};

export type GetUsersSuccessResponse = {
  pagination: PaginationInfo;
  data: Omit<UserEntity, 'password'>[];
};
