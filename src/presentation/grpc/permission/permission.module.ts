import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { GetPermissionsByUserUseCase } from '@/use-cases/permission';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [PermissionController],
  providers: [GetPermissionsByUserUseCase],
})
export class PermissionModule {}
