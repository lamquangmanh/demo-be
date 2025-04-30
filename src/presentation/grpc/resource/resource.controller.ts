// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateResourceRequest } from '@lamquangmanh/protobuf/dist/build/resource/v1/resource';

// import from use-cases
import {
  CreateResourceUseCase,
  CreateResourceRequestDto,
  CreateResourceSuccessResponse,
  GetResourceUseCase,
  GetResourcesSuccessResponse,
  GetResourcesUseCase,
  UpdateResourceUseCase,
  UpdateResourceRequestDto,
  DeleteResourceUseCase,
  DeleteResourceRequestDto,
} from '@/use-cases/resource';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { ResourceEntity } from '@/domain/entities';

@Controller()
export class ResourceController {
  constructor(
    private readonly createResourceUseCase: CreateResourceUseCase,
    private readonly getResourceUseCase: GetResourceUseCase,
    private readonly getResourcesUseCase: GetResourcesUseCase,
    private readonly updateResourceUseCase: UpdateResourceUseCase,
    private readonly deleteResourceUseCase: DeleteResourceUseCase,
  ) {}

  @GrpcMethod('ResourceService', 'GetResource')
  async getResource({ resourceId }): Promise<ResourceEntity | null> {
    return await this.getResourceUseCase.execute(resourceId);
  }

  @GrpcMethod('ResourceService', 'GetResources')
  async getResources(data: any): Promise<GetResourcesSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getResourcesUseCase.execute(dto);
  }

  @GrpcMethod('ResourceService', 'CreateResource')
  async createResource(
    data: CreateResourceRequest,
  ): Promise<CreateResourceSuccessResponse> {
    const dto = await validateDto(data, CreateResourceRequestDto);
    return this.createResourceUseCase.execute(dto);
  }

  @GrpcMethod('ResourceService', 'UpdateResource')
  async updateResource(data: any): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateResourceRequestDto);
    return this.updateResourceUseCase.execute(dto);
  }

  @GrpcMethod('ResourceService', 'DeleteResource')
  async deleteResource(data: any): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteResourceRequestDto);
    return this.deleteResourceUseCase.execute(dto);
  }
}
