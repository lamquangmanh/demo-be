import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Environment } from '../../domain/enums/system.enum';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNestJs } from '@nestjs/config';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;
  @IsNumber()
  GRPC_PORT: number;
  // DEBUG
  @IsOptional()
  @IsBoolean()
  DEBUG: boolean;

  // DB
  @IsString()
  POSTGRES_HOST: string;
  @IsNumber()
  POSTGRES_PORT: number;
  @IsString()
  POSTGRES_USER: string;
  @IsString()
  POSTGRES_PASSWORD: string;
  @IsString()
  POSTGRES_DB: string;

  // JWT
  @IsString()
  JWT_SECRET: string;
  @IsNumber()
  JWT_EXPIRES_IN: number;
}

const validateEnv = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors?.length > 0) {
    console.info(
      '\n😻 ---------------Validating .env.* file--------------- 😻',
    );
    console.error(errors.map((e) => e.constraints));
    process.exit(1);
  }

  return validatedConfig;
};

const configEnv = () => ({
  port: parseInt(process.env.PORT),
  grpcPort: parseInt(process.env.GRPC_PORT),

  env: process.env.ENV,
  isProd: Environment.Production === process.env.ENV,
  isDev: Environment.Development === process.env.ENV,
  debug: Boolean(process.env.DEBUG === 'true'),

  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

@Module({
  imports: [
    ConfigModuleNestJs.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.development', '.env.local'],
      validate: validateEnv,
      cache: true,
      load: [configEnv],
    }),
  ],
})
export class ConfigModule {}
