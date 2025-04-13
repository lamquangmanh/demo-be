import { BaseEntity } from './base.entity';

export interface ResourceEntity extends BaseEntity {
  resourceId: string;
  name: string;
  moduleId: string;
}
