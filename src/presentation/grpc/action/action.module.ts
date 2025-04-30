import { Module } from '@nestjs/common';

import { ActionController } from './action.controller';
import {
  CreateActionUseCase,
  GetActionUseCase,
  GetActionsUseCase,
  UpdateActionUseCase,
  DeleteActionUseCase,
} from '@/use-cases/action';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ActionController],
  providers: [
    CreateActionUseCase,
    GetActionUseCase,
    GetActionsUseCase,
    UpdateActionUseCase,
    DeleteActionUseCase,
  ],
})
export class ActionModule {}
