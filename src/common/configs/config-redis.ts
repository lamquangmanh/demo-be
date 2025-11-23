import Redis from 'ioredis';

import { CONFIGURATION } from './config-validation-schema';
import { REDIS_CLIENT } from '../constants';

export const redisConnection = {
  host: CONFIGURATION.REDIS_HOST,
  port: CONFIGURATION.REDIS_PORT,
  db: CONFIGURATION.REDIS_DB ?? undefined,
  password: CONFIGURATION.REDIS_PASS ?? undefined,
  keyPrefix: CONFIGURATION.REDIS_KEY_PREFIX ?? undefined,
};
export const redisClient = new Redis(redisConnection);

export const REDIS_PROVIDER = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    return redisClient;
  },
};
