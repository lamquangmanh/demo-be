// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  CreateModuleUseCase,
  CreateModuleRequestDto,
  CreateModuleSuccessResponse,
  GetModuleUseCase,
  GetModulesSuccessResponse,
  GetModulesUseCase,
  UpdateModuleUseCase,
  UpdateModuleRequestDto,
  DeleteModuleUseCase,
  DeleteModuleRequestDto,
} from '@/use-cases/module';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { ModuleEntity } from '@/domain/entities';

@Controller()
export class ModuleController {
  constructor(
    private readonly createModuleUseCase: CreateModuleUseCase,
    private readonly getModuleUseCase: GetModuleUseCase,
    private readonly getModulesUseCase: GetModulesUseCase,
    private readonly updateModuleUseCase: UpdateModuleUseCase,
    private readonly deleteModuleUseCase: DeleteModuleUseCase,
  ) {}

  @GrpcMethod('ModuleService', 'GetModule')
  async getModule({
    moduleId,
  }: {
    moduleId: string;
  }): Promise<ModuleEntity | null> {
    return await this.getModuleUseCase.execute(moduleId);
  }

  @GrpcMethod('ModuleService', 'GetModules')
  async getModules(data: any): Promise<GetModulesSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getModulesUseCase.execute(dto);
  }

  @GrpcMethod('ModuleService', 'CreateModule')
  async createModule(data: any): Promise<CreateModuleSuccessResponse> {
    const dto = await validateDto(data, CreateModuleRequestDto);
    return this.createModuleUseCase.execute(dto);
  }

  @GrpcMethod('ModuleService', 'UpdateModule')
  async updateModule(data: any): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateModuleRequestDto);
    return this.updateModuleUseCase.execute(dto);
  }

  @GrpcMethod('ModuleService', 'DeleteModule')
  async deleteModule(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteModuleRequestDto);
    return this.deleteModuleUseCase.execute(dto);
  }
}
