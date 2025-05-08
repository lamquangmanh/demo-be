// import from libraries
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { status } from '@grpc/grpc-js';
import { In, Not } from 'typeorm';

// import from common
import {
  USER_REPOSITORY,
  UserStatus,
  USER_ROLE_REPOSITORY,
  ROLE_REPOSITORY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';

// import from domain
import { UserEntity } from '@/domain/entities';
import {
  UserRepository,
  UserRoleRepository,
  RoleRepository,
} from '@/domain/repositories';
import { UpdateSuccessResponse } from '@/domain/types';

// import from use-case dto
import { UpdateUserRequestDto } from './dtos';

export class UpdateUserUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  @Inject(ROLE_REPOSITORY)
  private readonly roleRepo: RoleRepository;

  async validate(data: UpdateUserRequestDto): Promise<void> {
    // Check if the user exists
    const user = await this.userRepo.findOne({
      userId: data.user.userId,
    });
    if (!user) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'User not found',
        extra: {
          fields: [{ field: 'userId', error: 'User not found' }],
        },
      });
    }

    // check list of roleIds not found
    const roleIds = data.user.roleIds ?? [];
    const roles = await this.roleRepo.findMany({
      roleId: In(roleIds),
    });
    if (roleIds.length > roles.length) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'Role not found',
        extra: {
          fields: [
            {
              field: 'roleIds',
              error: 'Roles not found',
            },
          ],
        },
      });
    }
  }

  async execute(data: UpdateUserRequestDto): Promise<UpdateSuccessResponse> {
    // Validate the input
    await this.validate(data);

    // Hash the password if it's being updated
    const updatedData: Partial<UserEntity> = { updatedUserId: data.userId };
    if (data.user.password) {
      const hashedPassword = await bcrypt.hash(data.user.password, 10);
      updatedData.password = hashedPassword;
    }
    if (data.user.phone) {
      updatedData.phone = data.user.phone;
    }
    if (data.user.avatar) {
      updatedData.avatar = data.user.avatar;
    }
    if (data.user.username) {
      updatedData.username = data.user.username;
    }
    if (data.user.status) {
      updatedData.status = data.user.status;
      if (updatedData.status === UserStatus.DELETED) {
        updatedData.deletedAt = new Date();
        updatedData.deletedUserId = data.userId;
      }
    }

    // update the user and return the result
    const result = await this.userRepo.updateOne(data.user.userId, updatedData);

    // delete all user roles not in the new list
    const roleIds = data.user.roleIds ?? [];
    await this.userRoleRepo.softDeleteBy(
      {
        userId: data.user.userId,
        roleId: Not(In(roleIds)),
      },
      { deletedUserId: data.userId, deletedAt: new Date() },
    );

    // get list of roleIds not in the new list
    const existingRoles = await this.userRoleRepo.findMany({
      userId: data.user.userId,
    });
    const existingRoleIds = existingRoles.map((role) => role.roleId);
    const newRoleIds = roleIds.filter(
      (roleId) => !existingRoleIds.includes(roleId),
    );
    // insert new roles
    if (newRoleIds.length > 0) {
      const newRoles = newRoleIds.map((roleId: string) => ({
        userId: data.user.userId,
        roleId,
        createdUserId: data.userId,
        updatedUserId: data.userId,
      }));
      await this.userRoleRepo.createMany(newRoles);
    }

    return { success: (result?.affected ?? 0) > 0 };
  }
}
