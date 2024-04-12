import { Logging } from '@google-cloud/logging';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GCPClientLogger {
  private client: Logging;
  constructor(private configService: ConfigService) {
    this.client = new Logging({
      projectId: this.configService.get('gcpProjectId'),
      keyFilename: '/path/to/key.json',
    });
  }

  getClient() {
    return this.client;
  }
}
