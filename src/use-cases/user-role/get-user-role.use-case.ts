// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_ROLE_REPOSITORY } from '@/common/constants';

// import from domain
import { UserRoleRepository } from '@/domain/repositories';
import { UserRoleEntity } from '@/domain/entities';

export class GetUserRoleUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly repo: UserRoleRepository;

  async execute(userRoleId: string): Promise<UserRoleEntity | null> {
    return this.repo.findOne({ userRoleId });
  }
}
