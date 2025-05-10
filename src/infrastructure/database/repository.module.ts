import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import from domain
import {
  ACTION_REPOSITORY,
  MODULE_REPOSITORY,
  PERMISSION_REPOSITORY,
  RESOURCE_REPOSITORY,
  ROLE_REPOSITORY,
  USER_ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@/common/constants';

// import from infrastructure
import {
  ActionRepository,
  ModuleRepository,
  PermissionRepository,
  ResourceRepository,
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from './repositories';

import {
  ActionEntity,
  ModuleEntity,
  PermissionEntity,
  ResourceEntity,
  RoleEntity,
  UserEntity,
  UserRoleEntity,
} from './entities';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: (config: ConfigService) => ({
      //   type: 'postgres',
      //   host: config.get('DB_HOST'),
      //   port: config.get<number>('DB_PORT'),
      //   username: config.get('DB_USER'),
      //   password: config.get('DB_PASS') ?? undefined,
      //   database: config.get('DB_NAME'),
      //   entities: [join(__dirname, '../entities/*{.ts,.js}')],
      //   synchronize: false,
      //   autoLoadEntities: true,
      //   migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
      //   migrationsRun: true,
      // }),
      useFactory: (config: ConfigService): any => {
        const configDB = {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASS') ?? undefined,
          database: config.get('DB_NAME'),
          entities: [join(__dirname, '../entities/*{.ts,.js}')],
          synchronize: false,
          autoLoadEntities: true,
          migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
          migrationsRun: true,
        };
        console.log('Database configuration: ', configDB);
        return configDB;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      ActionEntity,
      ModuleEntity,
      PermissionEntity,
      ResourceEntity,
      RoleEntity,
      UserEntity,
      UserRoleEntity,
    ]),
  ],
  providers: [
    { provide: ACTION_REPOSITORY, useClass: ActionRepository },
    { provide: MODULE_REPOSITORY, useClass: ModuleRepository },
    { provide: PERMISSION_REPOSITORY, useClass: PermissionRepository },
    { provide: RESOURCE_REPOSITORY, useClass: ResourceRepository },
    { provide: ROLE_REPOSITORY, useClass: RoleRepository },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: USER_ROLE_REPOSITORY, useClass: UserRoleRepository },
  ],
  exports: [
    ACTION_REPOSITORY,
    MODULE_REPOSITORY,
    PERMISSION_REPOSITORY,
    RESOURCE_REPOSITORY,
    ROLE_REPOSITORY,
    USER_ROLE_REPOSITORY,
    USER_REPOSITORY,
  ],
})
export class RepositoryModule {
  constructor(private dataSource: DataSource) {}
}
