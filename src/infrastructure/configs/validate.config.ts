import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ErrorResponse } from '@application/utils';
import { status } from '@grpc/grpc-js';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          exceptionFactory: (validationErrors: ValidationError[] = []) => {
            return ErrorResponse({
              code: status.INVALID_ARGUMENT, //
              message: config.get('isProd', false)
                ? undefined
                : validationErrors.toString(),
            });
          },
        });
      },
    },
  ],
})
export class ValidateConfig {}
