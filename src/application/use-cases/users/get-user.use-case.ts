import { Injectable } from '@nestjs/common';
import { GetUserUseCaseAbstract } from '@domain/use-cases/users';
import { DatabaseContextAbstract } from '@src/domain/abstracts';
import { IUser } from '@src/domain/entities';
import { ErrorResponse } from '@src/application/utils';
import { USER_EXCEPTION } from '@src/application/exceptions/user.exception';
import { LoggerAbstract } from '@src/domain/abstracts/logger.abstract';

@Injectable()
export class GetUserUseCase implements GetUserUseCaseAbstract {
  constructor(
    private dbContext: DatabaseContextAbstract,
    private logger: LoggerAbstract,
  ) {
    this.logger.init('UsecaseModule', 'GetUserUseCase');
  }
  async execute(id: number): Promise<IUser> {
    this.logger.info('hehe');
    if (!id) throw ErrorResponse({ errorCode: USER_EXCEPTION.USER_NOT_FOUND });
    const user = await this.dbContext.user.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
    if (!user)
      throw ErrorResponse({ errorCode: USER_EXCEPTION.USER_NOT_FOUND });
    return user;
  }
}
