// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ACTION_REPOSITORY } from '@/common/constants';

// import from domain
import { ActionRepository } from '@/domain/repositories';
import { ActionEntity } from '@/domain/entities';

// import from use-case dto
// import { GetActionSuccessResponse } from './types';

export class GetActionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  async execute(actionId: string): Promise<ActionEntity | null> {
    // get action
    return this.actionRepo.findOne({ actionId });
  }
}
