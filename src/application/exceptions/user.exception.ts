import { status } from '@grpc/grpc-js';

export const USER_EXCEPTION = {
  USER_NOT_FOUND: {
    errorCode: status.NOT_FOUND,
    message: 'USER_NOT_FOUND',
  },
};
