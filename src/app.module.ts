import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// load config
import { configValidationSchema } from './common/configs/config-validation-schema';

// load repository.module for database
import { RepositoryModule } from './infrastructure/database/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    RepositoryModule,
  ],
  providers: [],
})
export class AppModule {}
