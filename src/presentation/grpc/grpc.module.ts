import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UseCaseManagerModule } from '@infrastructure/use-case-manager/use-case-manager.module';

@Module({
  imports: [UseCaseManagerModule],
  controllers: [UserController],
})
export class GrpcModule {}
