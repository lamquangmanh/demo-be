import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { throwError } from 'rxjs';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor(@Inject(LoggerAbstract) private logger: LoggerAbstract) {
    logger.init('AppModule', 'LoggerConsoleException');
  }

  catch(exception: any, host: ArgumentsHost) {
    const type: string = host.getType();
    if (type === 'rpc') return this.handleGrpc(exception);
    return this.handleGlobal(exception);
  }

  async handleGrpc(exception: RpcException) {
    this.logger.info(`🚀 ~ GrpcException ~ exception: ${exception}`);
    return throwError(() => exception.getError());
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
