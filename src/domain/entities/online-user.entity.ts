import { BaseEntity } from './base.entity';

export interface OnlineUserEntity extends BaseEntity {
  userOnlineId: string;
  userId: string;
  socketId: string;
  currentPageUrl?: string;
}
