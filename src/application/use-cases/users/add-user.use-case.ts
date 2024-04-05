import { Injectable } from '@nestjs/common';
import { AddUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUser } from '@src/domain/entities';

@Injectable()
export class AddUserUseCase implements AddUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  execute(data: IUser): Promise<IUser> {
    return this.dbContext.user.create(data);
  }
}
