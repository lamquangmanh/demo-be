import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './models';
import { DatabaseContextAbstract } from '@domain/abstracts';
import { PostgresConfigModule } from '@infrastructure/configs';
import { PostgresService } from './postgres.service';

@Module({
  imports: [PostgresConfigModule, TypeOrmModule.forFeature([User])],
  providers: [{ provide: DatabaseContextAbstract, useClass: PostgresService }],
  exports: [DatabaseContextAbstract],
})
export class PostgresModule {}
