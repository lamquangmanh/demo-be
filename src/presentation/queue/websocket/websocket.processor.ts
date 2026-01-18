import { Inject } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

// import from common
import {
  WSS_BFF_TO_BE_QUEUE,
  USER_CONNECTED_EVENT,
  USER_DISCONNECTED_EVENT,
  // MESSAGE_EVENT,
} from '@/common/constants';
import { MessageQueuePayload } from '@/common/interfaces';

// import use cases
import {
  DeleteOnlineUserUseCase,
  UpdateOnlineUserUseCase,
  UserConnectedEvent,
  UserDisconnectedEvent,
  // MessageEvent,
} from '@/use-cases/online-user';

@Processor(WSS_BFF_TO_BE_QUEUE)
export class WebSocketProcessor extends WorkerHost {
  @Inject(DeleteOnlineUserUseCase)
  private readonly deleteOnlineUserUseCase: DeleteOnlineUserUseCase;

  @Inject(UpdateOnlineUserUseCase)
  private readonly updateOnlineUserUseCase: UpdateOnlineUserUseCase;

  constructor() {
    super();
  }

  async process(job: Job<MessageQueuePayload<any>>): Promise<void> {
    console.log(
      `[WebSocketProcessor] Processing job: ${job.name}, ID: ${job.id}`,
    );
    console.log(
      `[WebSocketProcessor] Job data:`,
      JSON.stringify(job.data, null, 2),
    );

    switch (job.name) {
      case USER_CONNECTED_EVENT: {
        await this.processUserConnectedEvent(job);
        break;
      }
      case USER_DISCONNECTED_EVENT: {
        await this.processUserDisconnectedEvent(job);
        break;
      }
      // case MESSAGE_EVENT: {
      //   await this.processMessageEvent(job);
      //   break;
      // }
      default: {
        console.log(`[WebSocketProcessor] Unknown job name: ${job.name}`);
        break;
      }
    }
  }

  async processUserConnectedEvent(
    job: Job<UserConnectedEvent>,
  ): Promise<boolean> {
    const data = job.data;
    console.log('[WebSocketProcessor] Processing USER_CONNECTED event');

    try {
      await this.updateOnlineUserUseCase.execute({
        userId: data.metadata.userId || '',
        onlineUser: data.payload,
      });

      return true;
    } catch (error) {
      console.error(
        '[WebSocketProcessor] Error processing USER_CONNECTED event:',
        error,
      );
      return false;
    }
  }

  async processUserDisconnectedEvent(
    job: Job<UserDisconnectedEvent>,
  ): Promise<boolean> {
    const data = job.data;
    console.log('[WebSocketProcessor] Processing USER_DISCONNECTED event');
    try {
      await this.deleteOnlineUserUseCase.execute({
        socketId: data.payload.socketId,
      });
      return true;
    } catch (error) {
      console.error(
        '[WebSocketProcessor] Error processing USER_DISCONNECTED event:',
        error,
      );
      return false;
    }
  }

  // async processMessageEvent(job: Job<MessageEvent>): Promise<boolean> {
  //   const data = job.data;
  //   console.log('Processing message event with data:', data);
  //   try {
  //     // Currently, just log the message. Implement your logic here.
  //     console.log(
  //       `Message to user ${data.payload.toUserId}: ${data.payload.message}`,
  //     );
  //     return true;
  //   } catch (error) {
  //     console.error('Error processing message event:', error);
  //     return false;
  //   }
  // }
}
