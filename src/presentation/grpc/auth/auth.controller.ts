// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  LoginRequestDto,
  LoginSuccessResponse,
  LoginUseCase,
  VerifyRequestDto,
  VerifySuccessResponse,
  VerifyUseCase,
} from '@/use-cases/auth';

// import from common
import { validateDto } from '@/common';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyUseCase: VerifyUseCase,
  ) {}

  @GrpcMethod('AuthService', 'LoginRequest')
  async login(data: any): Promise<LoginSuccessResponse> {
    const dto = await validateDto(data, LoginRequestDto);
    return this.loginUseCase.execute(dto);
  }

  @GrpcMethod('AuthService', 'VerifyRequest')
  async verify(data: any): Promise<VerifySuccessResponse> {
    const dto = await validateDto(data, VerifyRequestDto);
    return this.verifyUseCase.execute(dto);
  }
}
