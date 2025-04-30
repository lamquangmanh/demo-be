import { Module } from '@nestjs/common';

import { ModuleController } from './module.controller';
import {
  CreateModuleUseCase,
  GetModuleUseCase,
  GetModulesUseCase,
  UpdateModuleUseCase,
  DeleteModuleUseCase,
} from '@/use-cases/module';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ModuleController],
  providers: [
    CreateModuleUseCase,
    GetModuleUseCase,
    GetModulesUseCase,
    UpdateModuleUseCase,
    DeleteModuleUseCase,
  ],
})
export class ModuleModule {}
