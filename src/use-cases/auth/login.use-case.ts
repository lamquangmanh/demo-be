// import from libraries
import { Inject } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

// import from common
import {
  USER_REPOSITORY,
  UserStatus,
  REDIS_CLIENT,
  LOGIN_USER_KEY,
} from '@/common/constants';
import { GrpcCustomException } from '@/common';
import { CONFIGURATION } from '@/common/configs';
import { JwtPayload } from '@/common/interfaces';

// import from domain
import { UserRepository } from '@/domain/repositories';

// import from use-case dto
import { LoginRequestDto } from './dtos';
import { LoginSuccessResponse } from './types';

export class LoginUseCase {
  @Inject(USER_REPOSITORY)
  private readonly userRepo: UserRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(REDIS_CLIENT)
  private readonly redis: Redis;

  async validate(data: LoginRequestDto): Promise<any> {
    // Check if the user not found
    const user = await this.userRepo.findOne({
      email: data.email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new GrpcCustomException({
        code: status.NOT_FOUND,
        message: 'User not found',
        extra: {
          fields: [{ field: 'email', error: 'User not found' }],
        },
      });
    }

    const isVerified = await bcrypt.compareSync(data.password, user.password);
    console.log('isVerified', isVerified, {
      a: data.password,
      b: user.password,
    });
    if (!isVerified) {
      throw new GrpcCustomException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid email or password',
        extra: {
          fields: [
            { field: 'email_or_password', error: 'Invalid email or password' },
          ],
        },
      });
    }
    return user;
  }

  async execute(data: LoginRequestDto): Promise<LoginSuccessResponse> {
    // Validate the input
    const user = await this.validate(data);

    // update the action and return the result
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
    };
    const response = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };

    // Store the refresh token in Redis
    const redisKey = LOGIN_USER_KEY.replace('{userId}', user.userId);
    const redisValue = JSON.stringify({
      userId: user.userId,
      email: user.email,
      refreshToken: response.refreshToken,
      accessToken: response.accessToken,
    });
    await this.redis.set(
      redisKey,
      redisValue,
      'EX',
      CONFIGURATION.JWT_EXPIRATION,
    );

    return response;
  }
}
