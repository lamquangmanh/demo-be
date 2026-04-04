// import from libraries
import { Inject } from '@nestjs/common';

// import from common
import { USER_REPOSITORY } from '@/common/constants';

// import from domain
import { UserRepository } from '@/domain/repositories';
import { UserEntity } from '@/domain/entities';

export class GetUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async execute(
    userId: string,
    withRelations: boolean = false,
  ): Promise<UserEntity | null> {
    // get user
    const user = await this.userRepo.findOne(
      { userId },
      {
        select: [
          'userId',
          'username',
          'email',
          'phone',
          'avatar',
          'status',
          'createdAt',
          'createdUserId',
          'updatedAt',
          'updatedUserId',
          'deletedAt',
          'deletedUserId',
        ],
        relations: withRelations ? ['userRoles', 'userRoles.role'] : [],
      },
    );

    const userData = this.userRepo.convertDateToISOString(user);
    if (!userData) {
      return null;
    }

    const roleIds = Array.isArray(userData.userRoles)
      ? userData.userRoles
          .map((item: any) => item?.roleId)
          .filter((roleId: string | undefined): roleId is string =>
            Boolean(roleId),
          )
      : [];

    return {
      ...userData,
      roleIds,
    };
  }
}
