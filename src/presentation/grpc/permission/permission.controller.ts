// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  GetPermissionsByUserUseCase,
  GetPermissionsByUserResponse,
} from '@/use-cases/permission';

@Controller()
export class PermissionController {
  constructor(
    private readonly getPermissionsByUserUseCase: GetPermissionsByUserUseCase,
  ) {}

  @GrpcMethod('PermissionService', 'GetPermissionsByUserId')
  async getProduct({
    userId,
  }: {
    userId: string;
  }): Promise<GetPermissionsByUserResponse> {
    return this.getPermissionsByUserUseCase.execute(userId);
  }
}
