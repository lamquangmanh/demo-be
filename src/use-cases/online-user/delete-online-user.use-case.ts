// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ONLINE_USER_REPOSITORY } from '@/common/constants';

// import from domain
import { OnlineUserRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeleteOnlineUserRequestDto } from './dtos';

export class DeleteOnlineUserUseCase {
  @Inject(ONLINE_USER_REPOSITORY)
  private readonly onlineUserRepository: OnlineUserRepository;

  async execute(
    input: DeleteOnlineUserRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // delete the online user and return the result
    const result = await this.onlineUserRepository.deleteBy({
      socketId: input.socketId,
    });
    return { success: (result.affected ?? 0) > 0 };
  }
}
