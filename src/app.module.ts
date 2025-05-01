import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// load config
import { configValidationSchema } from './common/configs/config-validation-schema';

// import repository module
import { RedisModule } from './infrastructure/redis/redis.module';
import { RepositoryModule } from './infrastructure/database/repository.module';
import { AuthModule } from './presentation/http/auth/auth.module';
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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
    }),
    RedisModule,
    RepositoryModule,
    AuthModule,
    UserModule,
    ModuleModule,
    ResourceModule,
    RoleModule,
  ],
  providers: [],
})
export class AppModule {}
