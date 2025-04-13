import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configGrpc } from './common/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // create microservice
  app.connectMicroservice(configGrpc);

  await app.startAllMicroservices();
  await app.listen(Number(process.env.PORT ?? 3000));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
