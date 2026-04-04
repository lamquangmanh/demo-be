// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

// import from common
import {
  USER_REPOSITORY,
  UserStatus,
  REDIS_CLIENT,
  LOGIN_USER_KEY,
  USER_ACTIONS_KEY,
} from '@/common/constants';
import { GrpcCustomException, JwtPayload } from '@/common';

// import from domain
import { UserRepository } from '@/domain/repositories';

// import from use-case dto
import { VerifyRequestDto } from './dtos';
import { VerifySuccessResponse } from './types';

export class VerifyUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(REDIS_CLIENT)
  private readonly redis: Redis;

  async validate(input: VerifyRequestDto): Promise<{ userId: string }> {
    //  extract the token from the request
    const token = input.accessToken;
    if (!token) {
      throw new GrpcCustomException({
        code: status.UNAUTHENTICATED,
        message: 'Token not found',
        extra: {
          fields: [{ field: 'accessToken', error: 'Token not found' }],
        },
      });
    }
    // Verify the token
    const decoded = this.jwtService.verify<JwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!decoded) {
      throw new GrpcCustomException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid token',
        extra: {
          fields: [{ field: 'accessToken', error: 'Invalid token' }],
        },
      });
    }
    if (typeof decoded.userId !== 'string' || decoded.userId.length === 0) {
      throw new GrpcCustomException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid token payload',
        extra: {
          fields: [{ field: 'accessToken', error: 'Invalid token payload' }],
        },
      });
    }
    // Check if the token is expired
    const now = Math.floor(Date.now() / 1000);
    if ((decoded.exp ?? 0) < now) {
      throw new GrpcCustomException({
        code: status.UNAUTHENTICATED,
        message: 'Token expired',
        extra: {
          fields: [{ field: 'accessToken', error: 'Token expired' }],
        },
      });
    }

    // Check if the token is revoked
    const redisKey = LOGIN_USER_KEY.replace('{userId}', decoded.userId);
    const isExpired = await this.redis.get(redisKey);
    if (!isExpired) {
      throw new GrpcCustomException({
        code: status.UNAUTHENTICATED,
        message: 'Token revoked',
        extra: {
          fields: [{ field: 'accessToken', error: 'Token revoked' }],
        },
      });
    }

    // Check if the user not found
    // const user = await this.userRepo.findOne({
    //   userId: decoded.userId,
    //   status: UserStatus.ACTIVE,
    // });
    // if (!user) {
    //   throw new GrpcCustomException({
    //     code: status.NOT_FOUND,
    //     message: 'User not found',
    //     extra: {
    //       fields: [{ field: 'email', error: 'User not found' }],
    //     },
    //   });
    // }

    return { userId: decoded.userId };
  }

  async checkPermission(
    userId: string,
    input: VerifyRequestDto,
  ): Promise<boolean> {
    // find action by userId on redis
    let actions: any = [];
    const redisKey = USER_ACTIONS_KEY.replace('{userId}', userId);
    const redisActionData = await this.redis.get(redisKey);

    if (redisActionData) {
      actions = JSON.parse(redisActionData);
    } else {
      // find the user information by id
      const user = await this.userRepo.findOne(
        {
          userId,
          status: UserStatus.ACTIVE,
        },
        {
          relations: [
            'userRoles',
            'userRoles.role',
            'userRoles.role.permissions.resource',
            'userRoles.role.permissions.action',
          ],
        },
      );

      // get all actions of the user
      const userRoles = user?.userRoles ?? [];
      actions = userRoles.flatMap((userRole) => {
        const permissions = userRole.role?.permissions ?? [];

        return permissions
          .map((permission) => {
            const resource = permission.resource;
            const action = permission.action;

            if (!resource || !action) {
              return null;
            }

            return {
              resource: {
                name: resource.name,
              },
              action: {
                name: action.name,
                description: action.description,
                requestType: action.requestType,
                url: action.url,
                method: action.method,
              },
            };
          })
          .filter((item): item is NonNullable<typeof item> => item !== null);
      });

      // set the actions to redis
      await this.redis.set(redisKey, JSON.stringify(actions), 'EX', 60 * 60);
    }

    // check action
    if (
      !actions.find(
        (actionItem) =>
          actionItem.action.method === input.method &&
          actionItem.action.url === input.url &&
          actionItem.action.requestType === input.requestType,
      )
    ) {
      return false;
    }

    return true;
  }

  async execute(input: VerifyRequestDto): Promise<VerifySuccessResponse> {
    // Validate the input
    const { userId } = await this.validate(input);

    // check permissions of the user
    const isValid = await this.checkPermission(userId, input);
    return {
      success: isValid,
    };
  }
}
