import { ActionEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateActionSuccessResponse = {
  action?: ActionEntity;
};

export type GetActionsSuccessResponse = {
  pagination: PaginationInfo;
  data: ActionEntity[];
};
