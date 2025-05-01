// import from libraries
import { Controller, Body, Post } from '@nestjs/common';

// import from use-cases
import {
  LoginRequestDto,
  LoginSuccessResponse,
  LoginUseCase,
  VerifyRequestDto,
  VerifySuccessResponse,
  VerifyUseCase,
} from '@/use-cases/auth';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly verifyUseCase: VerifyUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginSuccessResponse> {
    return await this.loginUseCase.execute(body);
  }

  @Post('verify')
  async verify(@Body() body: VerifyRequestDto): Promise<VerifySuccessResponse> {
    return await this.verifyUseCase.execute(body);
  }
}
