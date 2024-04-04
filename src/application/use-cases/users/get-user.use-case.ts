import { Injectable } from '@nestjs/common';
import { GetUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUser } from '@src/domain/entities';

@Injectable()
export class GetUserUseCase implements GetUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  execute(id: number): Promise<IUser> {
    return this.dbContext.user.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }
}
