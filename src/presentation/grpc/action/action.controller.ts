// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// import from use-cases
import {
  CreateActionUseCase,
  CreateActionRequestDto,
  CreateActionSuccessResponse,
  GetActionUseCase,
  GetActionsSuccessResponse,
  GetActionsUseCase,
  UpdateActionUseCase,
  UpdateActionRequestDto,
  DeleteActionUseCase,
  DeleteActionRequestDto,
} from '@/use-cases/action';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { ActionEntity } from '@/domain/entities';

@Controller()
export class ActionController {
  constructor(
    private readonly createActionUseCase: CreateActionUseCase,
    private readonly getActionUseCase: GetActionUseCase,
    private readonly getActionsUseCase: GetActionsUseCase,
    private readonly updateActionUseCase: UpdateActionUseCase,
    private readonly deleteActionUseCase: DeleteActionUseCase,
  ) {}

  @GrpcMethod('ActionService', 'GetAction')
  async getAction({ ActionId }): Promise<ActionEntity | null> {
    return await this.getActionUseCase.execute(ActionId);
  }

  @GrpcMethod('ActionService', 'GetActions')
  async getActions(data: any): Promise<GetActionsSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getActionsUseCase.execute(dto);
  }

  @GrpcMethod('ActionService', 'CreateAction')
  async createAction(data: any): Promise<CreateActionSuccessResponse> {
    const dto = await validateDto(data, CreateActionRequestDto);
    return this.createActionUseCase.execute(dto);
  }

  @GrpcMethod('ActionService', 'UpdateAction')
  async updateAction(data: any): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateActionRequestDto);
    return this.updateActionUseCase.execute(dto);
  }

  @GrpcMethod('ActionService', 'DeleteAction')
  async deleteAction(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteActionRequestDto);
    return this.deleteActionUseCase.execute(dto);
  }
}
