import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules';
import { UserEntity } from './models';

console.log
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity],
      synchronize: true,

      // synchronize: false,
      // logging: true,
      // entities: ['src/infrastructure/databases/postgres/entities/*.entity.ts'],
      // migrations: ['src/infrastructure/databases/migrations/*.ts'],
      // migrationsTableName: 'Migrations',
      // migrationsRun: true,
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
