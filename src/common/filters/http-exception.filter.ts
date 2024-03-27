import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const type: string = host.getType();
    if (type === 'http') return this.handleHttp(exception, host);
  }

  async handleHttp(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      // get code
      let code = exception.code || 500;
      if (exception.response?.message) code = 400;

      // get error data
      const error = {
        name: exception.name || null,
        type: exception.type || null,
        code,
        subCode: exception.subCode || undefined,
        subTitle: exception.subTitle || null,
        message: exception.response?.message || exception.message,
        data: exception.data || null,
      };
      response.status(exception.status || 400).json(error);
    } catch (e) {
      response.status(500).json({
        name: exception?.name || null,
        type: exception?.type || null,
        code: 500,
        subCode: exception?.subCode || undefined,
        subTitle: exception?.subTitle || null,
        message: exception?.response?.message || exception?.message,
        data: exception?.data || null,
      });
    }
  }
}
