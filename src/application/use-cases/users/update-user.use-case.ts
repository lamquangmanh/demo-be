import { Injectable } from '@nestjs/common';
import { UpdateUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUpdateSuccess, IUser } from '@src/domain/entities';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  async execute(data: IUser): Promise<IUpdateSuccess> {
    await this.dbContext.user.update(data);
    return { modifiedCount: 1 };
  }
}
