import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { LoggerInterceptor } from './application';
import { ConfigService } from '@nestjs/config';
import grpcOptions from '@infrastructure/configs/grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // setup use global interceptor
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.connectMicroservice<MicroserviceOptions>(grpcOptions(config));
  await app.startAllMicroservices();

  // listen because @infrastructure/database/postgres/postgres.service.ts.PostgresService use onApplicationBootstrap
  // onApplicationBootstrap then the database connection will be successful
  await app.listen(config.get('port'));
  console.log(`Application is running`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
