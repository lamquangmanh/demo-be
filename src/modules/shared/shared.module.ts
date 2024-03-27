import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity, PaymentEntity } from '../../models';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PaymentEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule.forFeature([UserEntity, PaymentEntity])],
})
export class SharedModule {}
