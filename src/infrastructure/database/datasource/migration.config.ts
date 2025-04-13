import { DataSource, DataSourceOptions } from 'typeorm';

export const MigrateSourceOpts: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsRun: true,
  logging: false,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(MigrateSourceOpts);
