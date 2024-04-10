import { Global, Module } from '@nestjs/common';
import { LoggerConsole } from './logger.console';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Global()
@Module({
  providers: [{ provide: LoggerAbstract, useClass: LoggerConsole }],
  exports: [LoggerAbstract],
})
export class LoggerModule {}
