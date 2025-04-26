import { RequestType } from '@/common/constants';
import { BaseEntity } from './base.entity';

export interface ActionEntity extends BaseEntity {
  actionId: string;
  resourceId: string;
  name: string;
  description?: string;
  requestType: RequestType;
  url: string;
  method: string;
}
