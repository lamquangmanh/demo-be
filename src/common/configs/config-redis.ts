import Redis from 'ioredis';

import { CONFIGURATION } from './config-validation-schema';
import { REDIS_CLIENT } from '../constants';

export const REDIS_PROVIDER = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    return new Redis({
      host: CONFIGURATION.REDIS_HOST,
      port: CONFIGURATION.REDIS_PORT,
      db: CONFIGURATION.REDIS_DB ?? undefined,
      password: CONFIGURATION.REDIS_PASSWORD ?? undefined,
      username: CONFIGURATION.REDIS_USERNAME ?? undefined,
      keyPrefix: CONFIGURATION.REDIS_KEY_PREFIX ?? undefined,
    });
  },
};
