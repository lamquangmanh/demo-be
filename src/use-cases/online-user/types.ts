// import from common
import { MessageQueuePayload } from '@/common/interfaces';

export interface UserConnectedPayload {
  socketId: string;
  userId: string;
}

export interface UserDisconnectedPayload {
  socketId: string;
  userId: string;
}

export interface MessagePayload {
  toUserId: string;
  message: string;
}

export interface UserConnectedEvent
  extends MessageQueuePayload<UserConnectedPayload> {}

export interface UserDisconnectedEvent
  extends MessageQueuePayload<UserDisconnectedPayload> {}

export interface MessageEvent extends MessageQueuePayload<MessagePayload> {}
