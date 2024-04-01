import { format } from 'util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType: string = context.getType();
    return next.handle().pipe(
      tap((response) => {
        // check config env is development
        if (process.env.ENV === 'development') {
          let request: any = {};
          switch (contextType) {
            case 'http':
            default: {
              const host = context.switchToHttp();
              request = host.getRequest<Request>();
              break;
            }
          }
          this.logger.log(
            format(
              '%s - %s - %s - %s - %s',
              request.method,
              request.url,
              JSON.stringify(request.headers),
              JSON.stringify(request.body),
              JSON.stringify(response),
            ),
          );
        }
      }),
    );
  }
}
