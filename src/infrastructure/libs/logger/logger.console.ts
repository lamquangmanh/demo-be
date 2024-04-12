import { Injectable, Scope } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import logger from 'pino';
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerConsole implements LoggerAbstract {
  private requestId: string;
  private userId: string;
  private moduleName: string;
  private providerName: string;

  init(moduleName: string, providerName: string) {
    this.moduleName = moduleName;
    this.providerName = providerName;
  }

  setRequestContext(requestId: string, userId: string) {
    this.requestId = requestId;
    this.userId = userId;
  }
  error(message: any) {
    logger({ level: 'error' }).error(
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
  }

  info(message: any) {
    logger({ level: 'info' }).info(
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
  }

  warn(message: any) {
    logger({ level: 'warn' }).warn(
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
  }

  debug(message: any) {
    logger({ level: 'debug' }).debug(
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
  }
}
