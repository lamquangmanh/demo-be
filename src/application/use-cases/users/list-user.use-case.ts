import { Injectable } from '@nestjs/common';
import { ListUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IPagination, IResponseSuccess, IUser } from '@src/domain/entities';

@Injectable()
export class ListUserUseCase implements ListUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  async execute(pagination: IPagination): Promise<IResponseSuccess<IUser[]>> {
    // result findAndCount in typeorm is Promise<[IUser[], number]>
    const data: Promise<[IUser[], number]> =
      await this.dbContext.user.pagination({
        ...pagination.getOptions(),
        select: {
          id: true,
          username: true,
          name: true,
        },
      });
    return { total: data[1], data: data[0] };
  }
}
