import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const type: string = host.getType();
    console.error(`🚀 ~ GlobalException ~ exception[${type}]:`, exception);
    if (type === 'rpc') return this.handleGrpc(exception, host);
  }

  async handleGrpc(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    console.log(12344, exception, ctx.getData());
    throwError(() => ({
      extensions: {
        code: exception.message?.toUpperCase()?.trim()?.replaceAll(' ', '_'),
        devMessage: exception.getError(),
      },
    }));
  }
}
