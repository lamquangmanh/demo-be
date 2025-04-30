// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { ROLE_REPOSITORY } from '@/common/constants';

// import from domain
import { RoleRepository } from '@/domain/repositories';
import { RoleEntity } from '@/domain/entities';

export class GetRoleUseCase {
  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  async execute(roleId: string): Promise<RoleEntity | null> {
    return this.roleRepo.findOne({ roleId });
  }
}
