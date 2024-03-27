import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { grpcOptions } from './grpc-options';
import { LoggerInterceptor, HttpExceptionFilter } from './common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcOptions);

  // setup use global interceptor
  app.useGlobalInterceptors(new LoggerInterceptor());

  // setup use global filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // setup default validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,

      // properties if not exists in object validator will be removed into the data object.
      whitelist: true,
    }),
  );

  await app.listen();
  console.log(`Application is running on port: ${process.env.PORT}`);
}
bootstrap();
