// notification.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { BE_TO_BFF_QUEUE } from '@/common/constants';
import { MessageQueuePayload } from '@/common/interfaces';

@Processor(BE_TO_BFF_QUEUE)
export class WebSocketProcessor extends WorkerHost {
  constructor() {
    super();
  }

  process(
    job: Job<MessageQueuePayload<{ userId: string; message: string }>>,
  ): any {
    console.log('📩 Received job:', job.name, job.data);

    // send to WebSocket client
    const socketId = job.data.metadata.socketId || '';
    const payload = job.data.payload;
  }
}
