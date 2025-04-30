import { ResourceEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateResourceSuccessResponse = {
  resource?: ResourceEntity;
};

export type GetResourcesSuccessResponse = {
  pagination: PaginationInfo;
  data: ResourceEntity[];
};
