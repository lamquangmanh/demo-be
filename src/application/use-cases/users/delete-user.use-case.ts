import { Injectable } from '@nestjs/common';
import { DeleteUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IDeleteSuccess } from '@src/domain/entities';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  execute(id: number): Promise<IDeleteSuccess> {
    return this.dbContext.user
      .delete({
        id: id,
      })
      .then(() => ({ deletedCount: 1 }));
  }
}
