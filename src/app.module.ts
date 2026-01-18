import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';

// load config
import { configValidationSchema, queueConnection } from './common/configs';

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

// import queue modules
import { WebSocketModule } from './presentation/queue/websocket/websocket.module';

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
    BullModule.forRoot({
      connection: queueConnection,
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
    WebSocketModule,
  ],
  providers: [],
})
export class AppModule {}
