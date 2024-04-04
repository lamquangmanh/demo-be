import { Injectable } from '@nestjs/common';
import { UpdateUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUpdateSuccess, IUser } from '@src/domain/entities';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  execute(data: IUser): Promise<IUpdateSuccess> {
    return this.dbContext.user.update(data).then(() => ({ modifiedCount: 1 }));
  }
}
