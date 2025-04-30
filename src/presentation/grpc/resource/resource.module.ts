import { Module } from '@nestjs/common';

import { ResourceController } from './resource.controller';
import {
  CreateResourceUseCase,
  GetResourceUseCase,
  GetResourcesUseCase,
  UpdateResourceUseCase,
  DeleteResourceUseCase,
} from '@/use-cases/resource';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ResourceController],
  providers: [
    CreateResourceUseCase,
    GetResourceUseCase,
    GetResourcesUseCase,
    UpdateResourceUseCase,
    DeleteResourceUseCase,
  ],
})
export class ResourceModule {}
