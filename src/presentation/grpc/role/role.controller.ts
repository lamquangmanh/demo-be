// import from libraries
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRoleRequest,
  GetRoleRequest,
  GetRolesRequest,
  UpdateRoleRequest,
  DeleteRoleRequest,
} from '@lamquangmanh/protobuf/dist/role/v1/role';

// import from use-cases
import {
  CreateRoleUseCase,
  CreateRoleRequestDto,
  CreateRoleSuccessResponse,
  GetRoleUseCase,
  GetRolesSuccessResponse,
  GetRolesUseCase,
  UpdateRoleUseCase,
  UpdateRoleRequestDto,
  DeleteRoleUseCase,
  DeleteRoleRequestDto,
} from '@/use-cases/role';

// import from common
import { validateDto, GetListRequestDto } from '@/common';

// import from domain
import { UpdateSuccessResponse, DeleteSuccessResponse } from '@/domain/types';
import { RoleEntity } from '@/domain/entities';

@Controller()
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,
    private readonly getRolesUseCase: GetRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @GrpcMethod('RoleService', 'GetRole')
  async getRole({ roleId }: GetRoleRequest): Promise<RoleEntity | null> {
    return await this.getRoleUseCase.execute(roleId);
  }

  @GrpcMethod('RoleService', 'GetRoles')
  async getRoles(data: GetRolesRequest): Promise<GetRolesSuccessResponse> {
    const dto = await validateDto(data, GetListRequestDto);
    return this.getRolesUseCase.execute(dto);
  }

  @GrpcMethod('RoleService', 'CreateRole')
  async createRole(
    data: CreateRoleRequest,
  ): Promise<CreateRoleSuccessResponse> {
    const dto = await validateDto(data, CreateRoleRequestDto);
    return this.createRoleUseCase.execute(dto);
  }

  @GrpcMethod('RoleService', 'UpdateRole')
  async updateRole(data: UpdateRoleRequest): Promise<UpdateSuccessResponse> {
    const dto = await validateDto(data, UpdateRoleRequestDto);
    return this.updateRoleUseCase.execute(dto);
  }

  @GrpcMethod('RoleService', 'DeleteRole')
  async deleteRole(data: DeleteRoleRequest): Promise<DeleteSuccessResponse> {
    const dto = await validateDto(data, DeleteRoleRequestDto);
    return this.deleteRoleUseCase.execute(dto);
  }
}
