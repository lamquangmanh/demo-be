import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// load config
import { configValidationSchema } from './common/configs/config-validation-schema';

// import common module
import { RedisModule } from './infrastructure/redis/redis.module';
import { RepositoryModule } from './infrastructure/database/repository.module';

// import feature modules
import { AuthModule as AuthModuleHttp } from './presentation/http/auth/auth.module';
import { HealthModule } from './presentation/http/health/health.module';
import { UserModule } from './presentation/grpc/user/user.module';
import { ModuleModule } from './presentation/grpc/module/module.module';
import { ResourceModule } from './presentation/grpc/resource/resource.module';
import { RoleModule } from './presentation/grpc/role/role.module';
import { ActionModule } from './presentation/grpc/action/action.module';
import { AuthModule } from './presentation/grpc/auth/auth.module';
import { MenuModule } from './presentation/grpc/menu/menu.module';
import { ProductModule } from './presentation/grpc/product/product.module';
import { PermissionModule } from './presentation/grpc/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: configValidationSchema,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
    }),
    RedisModule,
    RepositoryModule,
    AuthModuleHttp,
    UserModule,
    ModuleModule,
    ResourceModule,
    RoleModule,
    ActionModule,
    AuthModule,
    MenuModule,
    ProductModule,
    PermissionModule,
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
