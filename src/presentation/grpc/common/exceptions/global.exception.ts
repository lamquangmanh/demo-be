import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ErrorResponseAbstract } from '@src/domain/abstracts';
import { throwError } from 'rxjs';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor() {}

  catch(exception: RpcException, host: ArgumentsHost) {
    const type: string = host.getType();
    if (type === 'rpc')
      return this.handleGrpc(exception.getError() as ErrorResponseAbstract);
    return this.handleGlobal(exception);
  }

  async handleGrpc(error: ErrorResponseAbstract) {
    console.error(`🚀 ~ GrpcException ~ exception:`, error.message);
    return throwError(() => ({
      code: error.errorCode,
      message: error.message,
      subCode: '',
      subMessage: '',
      data: error.data,
    }));
  }

  handleGlobal(exception: any): void {
    console.error('🚀 ~ GlobalException ~ exception:', exception);
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
