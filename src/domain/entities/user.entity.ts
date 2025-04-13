import { UserStatus } from '@/common/constants';
import { BaseEntity } from './base.entity';

export interface UserEntity extends BaseEntity {
  userId: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  status: UserStatus;
}
