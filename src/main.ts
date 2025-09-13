import 'dotenv/config';
// import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { configGrpc } from './common/configs';
import { LoggerInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // makes sure logs during bootstrap are buffered
    bufferLogs: true,
  });
  // app.useLogger(app.get(Logger)); // use Pino as the logger

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
  // await app.listen(Number(process.env.PORT ?? 3000));
  await app.listen(
    +(process.env.PORT ?? 3000),
    process.env.GRPC_HOST ?? 'localhost',
  );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
