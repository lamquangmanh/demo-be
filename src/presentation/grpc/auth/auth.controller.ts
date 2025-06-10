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
  GetMeRequestDto,
  GetMeSuccessResponse,
  GetMeUseCase,
} from '@/use-cases/auth';

// import from common
import { validateDto } from '@/common';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyUseCase: VerifyUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: any): Promise<LoginSuccessResponse> {
    const dto = await validateDto(data, LoginRequestDto);
    return this.loginUseCase.execute(dto);
  }

  @GrpcMethod('AuthService', 'Verify')
  async verify(data: any): Promise<VerifySuccessResponse> {
    const dto = await validateDto(data, VerifyRequestDto);
    return this.verifyUseCase.execute(dto);
  }

  @GrpcMethod('AuthService', 'GetMe')
  async getMe(data: any): Promise<GetMeSuccessResponse> {
    const dto = await validateDto(data, GetMeRequestDto);
    return this.getMeUseCase.execute(dto);
  }
}
