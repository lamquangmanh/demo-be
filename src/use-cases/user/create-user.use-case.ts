// import from libraries
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { status } from '@grpc/grpc-js';
import { omit } from 'lodash';

// import from common
import {
  USER_REPOSITORY,
  UserStatus,
  USER_ROLE_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserRepository, UserRoleRepository } from '@/domain/repositories';

// import from use-case dto
import { CreateUserRequestDto } from './dtos';
import { CreateUserSuccessResponse } from './types';

export class CreateUserUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  async validate(data: CreateUserRequestDto): Promise<void> {
    // check email is existing
    const user = await this.userRepo.findOne({
      email: data.user.email,
    });
    if (user) {
      throw new GrpcCustomException({
        code: status.ALREADY_EXISTS,
        message: 'Email is already in use',
        extra: {
          fields: [{ field: 'email', error: 'Email is already in use' }],
        },
      });
    }
  }

  async execute(
    data: CreateUserRequestDto,
  ): Promise<CreateUserSuccessResponse> {
    // validate
    await this.validate(data);

    // create new user
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roleIds, ...userInput } = data.user;
    const userData = {
      ...userInput,
      password: hashedPassword,
      createdUserId: data.userId,
      updatedUserId: data.userId,
      status: data.user.status ?? UserStatus.ACTIVE,
    };
    const user = await this.userRepo.createOne(userData);

    // create user role
    const userRoleData = data.user.roleIds.map((roleId) => ({
      userId: user.userId,
      roleId,
      createdUserId: data.userId,
      updatedUserId: data.userId,
    }));
    await this.userRoleRepo.createMany(userRoleData);

    return { user: omit(user, ['password']) };
  }
}
