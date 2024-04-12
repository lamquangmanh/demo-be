import { Module } from '@nestjs/common';
import {
  GetUserUseCase,
  ListUserUseCase,
  AddUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '@application/use-cases/users';
import {
  AddUserUseCaseAbstract,
  DeleteUserUseCaseAbstract,
  GetUserUseCaseAbstract,
  ListUserUseCaseAbstract,
  UpdateUserUseCaseAbstract,
} from '@domain/use-cases/users';
import { DatabaseModule } from '../databases/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: GetUserUseCaseAbstract, useClass: GetUserUseCase },
    { provide: ListUserUseCaseAbstract, useClass: ListUserUseCase },
    { provide: AddUserUseCaseAbstract, useClass: AddUserUseCase },
    { provide: UpdateUserUseCaseAbstract, useClass: UpdateUserUseCase },
    { provide: DeleteUserUseCaseAbstract, useClass: DeleteUserUseCase },
  ],
  exports: [
    GetUserUseCaseAbstract,
    ListUserUseCaseAbstract,
    AddUserUseCaseAbstract,
    UpdateUserUseCaseAbstract,
    DeleteUserUseCaseAbstract,
  ],
})
export class UseCaseManagerModule {}
