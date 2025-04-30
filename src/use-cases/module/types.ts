import { ModuleEntity } from '@/domain/entities';
import { PaginationInfo } from '@/domain/types';

export type CreateModuleSuccessResponse = {
  module?: ModuleEntity;
};

export type GetModulesSuccessResponse = {
  pagination: PaginationInfo;
  data: ModuleEntity[];
};
