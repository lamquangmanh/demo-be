import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// load config
import { configValidationSchema } from './common/configs/config-validation-schema';

// import repository module
import { RepositoryModule } from './infrastructure/database/repository.module';
import { UserModule } from './presentation/grpc/user/user.module';

// import use-case module
// import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    RepositoryModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
