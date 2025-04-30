// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { PERMISSION_REPOSITORY } from '@/common/constants';

// import from domain
import { PermissionRepository } from '@/domain/repositories';
import { PermissionEntity } from '@/domain/entities';

export class GetPermissionUseCase {
  @Inject(PERMISSION_REPOSITORY)
  private readonly repo: PermissionRepository;

  async execute(permissionId: string): Promise<PermissionEntity | null> {
    return this.repo.findOne({ permissionId });
  }
}
