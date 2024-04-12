import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ErrorResponse } from '@application/utils';

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
              errorCode: 'BAD_USER_INPUT', //
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
