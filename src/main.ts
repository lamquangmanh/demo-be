import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

import { grpcClientOptions } from './grpc-client.options';
import { AppModule } from './app.module';
import { LoggerInterceptor, HttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
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

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();

  // await app.listen(3000);
  // await app.listen(3000);
  console.log(`Application is running`);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
