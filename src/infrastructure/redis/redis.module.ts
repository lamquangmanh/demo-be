// src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';

// import from common/configs
import { REDIS_PROVIDER } from '../../common/configs/config-redis';

@Global()
@Module({
  providers: [REDIS_PROVIDER],
  exports: [REDIS_PROVIDER],
})
export class RedisModule {}
