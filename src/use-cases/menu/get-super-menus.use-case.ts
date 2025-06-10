// import from libraries
import { orderBy } from 'lodash';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';

// import from common
import {
  USER_ROLE_REPOSITORY,
  REDIS_CLIENT,
  USER_SUPER_MENU_KEY,
  RequestType,
} from '@/common/constants';

// import from domain
import { UserRoleRepository } from '@/domain/repositories';

// import from use-case dto
import {
  GetSuperMenusResponse,
  GetSuperMenusRequest,
  GetUserRoleResult,
  Resource,
  Module,
  Action,
} from './types';

export class GetSuperMenusUseCase {
  @Inject(USER_ROLE_REPOSITORY)
  private readonly userRoleRepo: UserRoleRepository;

  @Inject(REDIS_CLIENT)
  private readonly redis: Redis;

  async getUser(userId: string): Promise<any> {
    return await this.userRoleRepo.find({
      where: {
        userId,
      },
      relations: [
        'role',
        'role.permissions.resource',
        'role.permissions.action',
        'role.permissions.resource.module',
      ],
    });
  }

  addSuperMenu(
    data: GetSuperMenusResponse,
    module: Module,
  ): GetSuperMenusResponse {
    // check if module already exists in response data
    const existingModule = data.superMenus.find(
      (menu) => menu.moduleId === module.moduleId,
    );
    if (existingModule) return data;

    // if module does not exist, create a new one
    data.superMenus.push({
      moduleId: module.moduleId,
      name: module.name,
      description: module.description,
      url: module.url,
      menus: [],
    });

    return data;
  }

  addMenu(
    data: GetSuperMenusResponse,
    resource: Resource,
    moduleId: string,
    actionUrl: string,
  ): GetSuperMenusResponse {
    // find the super menu by moduleId
    const superMenu = data.superMenus.find(
      (menu) => menu.moduleId === moduleId,
    );
    if (!superMenu) {
      return data; // if super menu does not exist, return data
    }

    // check if menus array exists, if not, create it
    if (!superMenu.menus) {
      superMenu.menus = [];
    }
    // check if the resource already exists in the menus
    const existingResource = superMenu.menus.find(
      (menu) => menu.resourceId === resource.resourceId,
    );
    if (existingResource) {
      // if resource already exists, return data
      return data;
    }

    // if resource does not exist, create a new one
    superMenu.menus.push({
      resourceId: resource.resourceId,
      name: resource.name,
      url: actionUrl,
      subMenus: [],
    });
    return data;
  }

  addSubMenu(
    data: GetSuperMenusResponse,
    action: Action,
    resourceId: string,
    moduleId: string,
  ): GetSuperMenusResponse {
    // find the super menu by moduleId
    const superMenu = data.superMenus.find(
      (menu) => menu.moduleId === moduleId,
    );
    if (!superMenu) {
      return data; // if super menu does not exist, return data
    }
    // find the resource in the menus
    const resource = superMenu.menus.find(
      (menu) => menu.resourceId === resourceId,
    );
    if (!resource) {
      return data; // if resource does not exist, return data
    }
    // check if subMenus array exists, if not, create it
    if (!resource.subMenus) {
      resource.subMenus = [];
    }
    // check if the action already exists in the subMenus
    const existingAction = resource.subMenus.find(
      (subMenu) => subMenu.actionId === action.actionId,
    );
    if (existingAction) {
      // if action already exists, return data
      return data;
    }

    // if action does not exist, create a new one
    resource.subMenus.push({
      actionId: action.actionId,
      name: action.name,
      url: action.url,
      requestType: action.requestType,
      method: action.method,
    });
    return data;
  }

  buildResponseData(userRoles: GetUserRoleResult[]): GetSuperMenusResponse {
    let responseData: GetSuperMenusResponse = {
      superMenus: [],
    };

    for (const userRole of userRoles) {
      for (const permission of userRole.role.permissions) {
        const module = permission.resource.module;
        const action = permission.action;
        const resource = permission.resource;

        // only get actions with requestType VIEW
        if ((action.requestType as RequestType) !== RequestType.VIEW) {
          continue;
        }

        // add super menu if it does not exist
        responseData = this.addSuperMenu(responseData, module);

        // add menu if it does not exist
        responseData = this.addMenu(
          responseData,
          resource,
          module.moduleId,
          action.url,
        );

        // add subMenu if it does not exist
        responseData = this.addSubMenu(
          responseData,
          action,
          resource.resourceId,
          module.moduleId,
        );
      }
    }

    // sort the superMenus, menus, and subMenus in descending order by name
    const sortedData = {
      superMenus: orderBy(responseData.superMenus, ['name'], ['desc']).map(
        (superMenu) => ({
          ...superMenu,
          menus: orderBy(superMenu.menus, ['name'], ['desc']).map((menu) => ({
            ...menu,
            subMenus: orderBy(menu.subMenus, ['name'], ['desc']),
          })),
        }),
      ),
    };

    return sortedData;
  }

  async execute(request: GetSuperMenusRequest): Promise<GetSuperMenusResponse> {
    // get data from redis
    const redisKey = USER_SUPER_MENU_KEY.replace('{userId}', request.userId);
    const redisActionData = await this.redis.get(redisKey);
    if (redisActionData) return JSON.parse(redisActionData);

    // get user information
    const user = await this.getUser(request.userId);

    // build data for response
    const data = this.buildResponseData(user);

    // set the actions to redis: expires in 1 day. set temporaty is 1 minute
    // await this.redis.set(redisKey, JSON.stringify(data), 'EX', 60 * 60 * 24);
    await this.redis.set(redisKey, JSON.stringify(data), 'EX', 60);
    return data;
  }
}
