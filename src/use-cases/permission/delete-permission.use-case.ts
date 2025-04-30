// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

// import from common
import { PERMISSION_REPOSITORY } from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { PermissionRepository } from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { DeletePermissionRequestDto } from './dtos';

export class DeletePermissionUseCase {
  @Inject(PERMISSION_REPOSITORY)
  private readonly permissionRepo: PermissionRepository;

  async validate(input: DeletePermissionRequestDto): Promise<void> {
    // Check if the permission exists
    const permission = await this.permissionRepo.findOne({
      permissionId: input.permissionId,
    });
    if (!permission) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Permission not found',
        extra: {
          fields: [{ field: 'permissionId', error: 'permission not found' }],
        },
      });
    }
  }

  async execute(
    input: DeletePermissionRequestDto,
  ): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(input);

    // update the permission and return the result
    const result = await this.permissionRepo.softDeleteById(
      input.permissionId,
      {
        deletedUserId: input.userId,
        deletedAt: new Date(),
      },
    );
    return { success: (result?.affected ?? 0) > 0 };
  }
}
