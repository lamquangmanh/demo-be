import { Module } from '@nestjs/common';
import { ConfigModule } from './infrastructure/configs/env.config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalException } from '@presentation/grpc/common/exceptions/global.exception';
import { GrpcModule } from '@presentation/grpc/grpc.module';

@Module({
  imports: [ConfigModule, GrpcModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
  ],
})
export class AppModule {}
