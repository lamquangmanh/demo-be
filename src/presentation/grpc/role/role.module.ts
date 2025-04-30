import { Module } from '@nestjs/common';

import { RoleController } from './role.controller';
import {
  CreateRoleUseCase,
  GetRoleUseCase,
  GetRolesUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
} from '@/use-cases/role';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    GetRoleUseCase,
    GetRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
})
export class RoleModule {}
