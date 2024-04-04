import { Injectable } from '@nestjs/common';
import { ListUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IPagination, IResponseSuccess, IUser } from '@src/domain/entities';

@Injectable()
export class ListUserUseCase implements ListUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  execute(pagination: IPagination): Promise<IResponseSuccess<IUser[]>> {
    return this.dbContext.user
      .pagination({
        ...pagination.getOptions(),
        select: {
          id: true,
          username: true,
          name: true,
        },
      })
      .then((data) => ({ total: data[1], data: data[0] }));
  }
}
