import { Module } from '@nestjs/common';

import { MenuController } from './menu.controller';
import { GetSuperMenusUseCase } from '@/use-cases/menu';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [MenuController],
  providers: [GetSuperMenusUseCase],
})
export class MenuModule {}
