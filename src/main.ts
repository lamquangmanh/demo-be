import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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

  // setup default validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,

      // properties if not exists in object validator will be removed into the data object.
      whitelist: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>(grpcOptions(config));
  await app.startAllMicroservices();

  await app.listen(config.get('port'));
  console.log(`Application is running`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
