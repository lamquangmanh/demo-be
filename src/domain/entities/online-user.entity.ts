import { BaseEntity } from './base.entity';

export interface OnlineUserEntity extends BaseEntity {
  onlineUserId: string;
  userId: string;
  socketId: string;
  deviceInfo?: string;
  currentPageUrl?: string;
}
