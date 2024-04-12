import { Global, Module } from '@nestjs/common';
import { LoggerConsole } from './logger.console';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { GCPClientLogger } from './logger-client.GCp';
import { LoggerGCP } from './logger.GCP';

@Global()
@Module({
  providers: [
    {
      provide: LoggerAbstract,
      useClass:
        process.env.NODE_ENV !== 'production' ? LoggerConsole : LoggerGCP,
    },
    GCPClientLogger,
  ],
  exports: [LoggerAbstract],
})
export class LoggerModule {}
