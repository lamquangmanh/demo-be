import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost): void {
    console.error(`🚀 ~ GlobalException ~ exception[${host.getType()}]:`, exception);

    if (exception?.errorCode) {
      throw new RpcException({
        extensions: {
          code:
            exception.errorCode || //
            exception.message?.toUpperCase()?.trim()?.replaceAll(' ', '_'),
          devMessage: exception?.devMessage,
        },
      });
    }
  }
}

export const formatError = (formattedError: any): any => {
  const extensions = formattedError?.extensions;
  const [code, statusCode, subMessage] = [extensions['code'], extensions['statusCode'], extensions['message']];
  const subMessageObj = subMessage
    ? {
        subMessage,
      }
    : {};

  delete extensions['code'];
  delete extensions['statusCode'];
  delete extensions['message'];

  console.error('🚀 ~ GraphqlException ~ error:', formattedError);

  if (['STG', 'PROD'].includes(process.env.ENV)) {
    return Object.assign(
      {
        message: formattedError.message,
        code,
        statusCode,
      },
      subMessageObj,
    );
  }

  return Object.assign(
    {
      ...formattedError,
      code,
      statusCode,
      extensions,
    },
    subMessageObj,
  );
};
