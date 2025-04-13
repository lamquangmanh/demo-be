import { REQUEST_TYPES } from '@/common/constants';
import { BaseEntity } from './base.entity';

export interface ActionEntity extends BaseEntity {
  actionId: string;
  resourceId: string;
  name: string;
  description?: string;
  requestType: REQUEST_TYPES;
  url: string;
  method: string;
}
