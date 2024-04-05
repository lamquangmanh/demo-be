import { Injectable } from '@nestjs/common';
import { DeleteUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IDeleteSuccess } from '@src/domain/entities';

@Injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  async execute(id: number): Promise<IDeleteSuccess> {
    await this.dbContext.user.delete({
      id: id,
    });
    return { deletedCount: 1 };
  }
}
