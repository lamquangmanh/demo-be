// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import { GetSuperMenusUseCase, GetSuperMenusResponse } from '@/use-cases/menu';

@Controller()
export class MenuController {
  constructor(private readonly useCase: GetSuperMenusUseCase) {}

  @GrpcMethod('MenuService', 'GetSuperMenus')
  async getSuperMenus(data: any): Promise<GetSuperMenusResponse> {
    return this.useCase.execute(data);
  }
}
