import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { LoginUseCase, VerifyUseCase } from '@/use-cases/auth';
import { RepositoryModule } from '@/infrastructure/database/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [AuthController],
  providers: [LoginUseCase, VerifyUseCase],
})
export class AuthModule {}
