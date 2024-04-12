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
      return this.handleGrpc(
        exception.getError() as ErrorResponseAbstract,
        host,
      );
    return this.handleGlobal(exception);
  }

  async handleGrpc(error: ErrorResponseAbstract, host: ArgumentsHost) {
    error.data = host.switchToRpc().getData();
    error.message = JSON.stringify(error);
    console.error(`🚀 ~ GrpcException ~ exception:`, error);
    return throwError(() => error);
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
