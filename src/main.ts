import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { LoggerInterceptor } from './application';
import grpcOptions from '@infrastructure/configs/grpc.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcOptions(),
  );

  // setup use global interceptor
  app.useGlobalInterceptors(new LoggerInterceptor());

  // listen because @infrastructure/database/postgres/postgres.service.ts.PostgresService use onApplicationBootstrap
  // onApplicationBootstrap then the database connection will be successful
  await app.listen();
  console.log(`Application is running on port: ${process.env.PORT}`);
}
bootstrap();
