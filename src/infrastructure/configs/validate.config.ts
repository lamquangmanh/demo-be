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
              errorCode: status.INVALID_ARGUMENT, //
              devMessage: config.get('isProd', false)
                ? undefined
                : validationErrors,
            });
          },
        });
      },
    },
  ],
})
export class ValidateConfig {}
