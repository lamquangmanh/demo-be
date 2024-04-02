import { IsBoolean, IsNumber, IsOptional, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Environment } from '../enums/system.enum';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNestJs } from '@nestjs/config';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;
  // DEBUG
  @IsOptional()
  @IsBoolean()
  DEBUG: boolean;
}

const validateEnv = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors?.length > 0) {
    console.info('\n😻 ---------------Validating .env.* file--------------- 😻');
    console.error(errors.map((e) => e.constraints));
    process.exit(1);
  }

  return validatedConfig;
};

const configEnv = () => ({
  port: parseInt(process.env.PORT),

  env: process.env.NODE_ENV,
  isProd: Environment.Production === process.env.NODE_ENV,
  isDev: Environment.Development === process.env.NODE_ENV,
  debug: Boolean(process.env.DEBUG === 'true'),
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
