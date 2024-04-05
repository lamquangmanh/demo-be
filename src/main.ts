import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggerInterceptor } from './application';
import grpcOptions from '@infrastructure/configs/grpc.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, grpcOptions);

  // setup use global interceptor
  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen();
  console.log(`Application is running`);
  console.log(`Application is running on: 0.0.0.0:${process.env.PORT}`);
}
bootstrap();
