import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

// import from common
import { WSS_BE_TO_BFF_QUEUE, WSS_BFF_TO_BE_QUEUE } from '@/common/constants';

// import from infrastructure
import { RepositoryModule } from '@/infrastructure/database/repository.module';

// import use cases
import {
  DeleteOnlineUserUseCase,
  UpdateOnlineUserUseCase,
} from '@/use-cases/online-user';
import { WebSocketProcessor } from './websocket.processor';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: WSS_BE_TO_BFF_QUEUE,
      },
      {
        name: WSS_BFF_TO_BE_QUEUE,
      },
    ),
    RepositoryModule,
  ],
  controllers: [],
  providers: [
    DeleteOnlineUserUseCase,
    UpdateOnlineUserUseCase,
    WebSocketProcessor,
  ],
})
export class WebSocketModule {}
