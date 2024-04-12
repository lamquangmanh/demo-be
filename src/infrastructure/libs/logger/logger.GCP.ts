import { Injectable, Scope } from '@nestjs/common';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';
import { Log } from '@google-cloud/logging';
import { GCPClientLogger } from './logger-client.GCp';
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerGCP implements LoggerAbstract {
  constructor(private gcpClient: GCPClientLogger) {}
  private requestId: string;
  private userId: string;
  private moduleName: string;
  private providerName: string;
  private GCPlogging: Log;

  init(moduleName: string, providerName: string) {
    this.moduleName = moduleName;
    this.providerName = providerName;
    this.GCPlogging = this.gcpClient.getClient().log(moduleName);
  }

  setRequestContext(requestId: string, userId: string) {
    this.requestId = requestId;
    this.userId = userId;
  }
  error(message: any) {
    const entry = this.GCPlogging.entry(
      { severity: 'ERROR' },
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
    this.GCPlogging.write(entry);
  }

  info(message: any) {
    const entry = this.GCPlogging.entry(
      { severity: 'INFO' },
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
    this.GCPlogging.write(entry);
  }

  warn(message: any) {
    const entry = this.GCPlogging.entry(
      { severity: 'WARNING' },
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
    this.GCPlogging.write(entry);
  }

  debug(message: any) {
    const entry = this.GCPlogging.entry(
      { severity: 'DEBUG' },
      `[${this.moduleName}/${this.providerName}] [${this.requestId}] [${this.userId}] message: ${JSON.stringify(message)}`,
    );
    this.GCPlogging.write(entry);
  }
}
