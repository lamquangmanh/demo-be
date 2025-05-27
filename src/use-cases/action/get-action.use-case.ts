// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ACTION_REPOSITORY } from '@/common/constants';

// import from domain
import { ActionRepository } from '@/domain/repositories';
import { ActionEntity } from '@/domain/entities';

export class GetActionUseCase {
  @Inject(ACTION_REPOSITORY)
  private readonly actionRepo: ActionRepository;

  async execute(actionId: string): Promise<ActionEntity | null> {
    // get action
    const result = await this.actionRepo.findOne({ actionId });
    return this.actionRepo.convertDateToISOString(result);
  }
}
