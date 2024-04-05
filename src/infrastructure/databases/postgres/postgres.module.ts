import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities';
import { DatabaseContextAbstract } from '@domain/abstracts';
import { PostgresConfigModule } from '@infrastructure/configs';
import { PostgresService } from './postgres.service';

@Module({
  imports: [PostgresConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [{ provide: DatabaseContextAbstract, useClass: PostgresService }],
  exports: [DatabaseContextAbstract],
})
export class PostgresModule {}
