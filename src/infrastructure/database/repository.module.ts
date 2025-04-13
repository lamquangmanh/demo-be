import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [],
        synchronize: false,
        autoLoadEntities: true,
        migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RepositoryModule {
  constructor(private dataSource: DataSource) {}
}
