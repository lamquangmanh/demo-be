import { Injectable } from '@nestjs/common';
import { UpdateUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUpdateSuccess, IUser } from '@src/domain/entities';
import { USER_EXCEPTION } from '@src/application/exceptions/user.exception';
import { ErrorResponse } from '@src/application/utils';

@Injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseAbstract {
  constructor(private dbContext: DatabaseContextAbstract) {}
  async execute(data: IUser): Promise<IUpdateSuccess> {
    if (!data.id) throw ErrorResponse(USER_EXCEPTION.USER_NOT_FOUND);
    const user = await this.dbContext.user.findOne({
      where: { id: data.id },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
    if (!user) throw ErrorResponse(USER_EXCEPTION.USER_NOT_FOUND);
    const rs = await this.dbContext.user.save(data);
    return { modifiedCount: rs.id && 1 };
  }
}
