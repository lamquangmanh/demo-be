import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// load config
import { configValidationSchema } from './common/configs/config-validation-schema';

// import repository module
import { RepositoryModule } from './infrastructure/database/repository.module';
import { UserModule } from './presentation/grpc/user/user.module';
import { ModuleModule } from './presentation/grpc/module/module.module';
import { ResourceModule } from './presentation/grpc/resource/resource.module';
import { RoleModule } from './presentation/grpc/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    RepositoryModule,
    UserModule,
    ModuleModule,
    ResourceModule,
    RoleModule,
  ],
  providers: [],
})
export class AppModule {}
