import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isHttp = context.getType() === 'http';
    const isRpc = context.getType() === 'rpc';

    const now = Date.now();
    const logData = {
      time: new Date().toISOString(),
      elapsed: 0,
      type: context.getType(),
      request: {},
      response: {},
      error: {},
    };

    if (isHttp) {
      const request = context.switchToHttp().getRequest();
      logData.request = {
        method: request.method,
        url: request.url,
        query: request.query,
        body: request.body,
        headers: request.headers,
      };
    }

    if (isRpc) {
      logData.request = {
        data: context.switchToRpc().getData(),
        handler: context.getHandler().name,
        controller: context.getClass().name,
      };
    }

    return next.handle().pipe(
      tap((data: any) => {
        logData.elapsed = Date.now() - now;
        logData.response = data;
        this.logger.log(
          `${logData.time} - ${logData.elapsed}ms - ${JSON.stringify(logData)}`,
        );
      }),
      catchError((err) => {
        logData.elapsed = Date.now() - now;
        logData.error = err;
        this.logger.error(
          `${logData.time} - ${logData.elapsed}ms - ${JSON.stringify(logData)}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
