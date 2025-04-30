import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { configGrpc } from './common/configs';
import { LoggerInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new LoggerInterceptor());

  // create microservice
  app.connectMicroservice(configGrpc, {
    inheritAppConfig: true,
  });

  await app.startAllMicroservices();
  await app.listen(Number(process.env.PORT ?? 3000));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
