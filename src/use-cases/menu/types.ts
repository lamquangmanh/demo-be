export interface SubMenu {
  actionId: string;
  name: string;
  url: string;
  method: string;
  requestType: string;
}

export interface Menu {
  resourceId: string;
  name: string;
  url: string;
  subMenus: SubMenu[];
}

export interface SuperMenu {
  moduleId: string;
  name: string;
  description: string;
  url: string;
  menus: Menu[];
}

export interface GetSuperMenusRequest {
  userId: string;
}

export interface GetSuperMenusResponse {
  superMenus: SuperMenu[];
}

export interface GetMenusRequest {
  userId: string;
}

export interface GetMenusResponse {
  menus: Menu[];
}

export interface Action {
  actionId: string;
  name: string;
  url: string;
  method: string;
  requestType: string;
}

export interface Module {
  moduleId: string;
  name: string;
  description: string;
  url: string;
}

export interface Resource {
  resourceId: string;
  name: string;
  module: Module;
}

export interface Permission {
  resource: Resource;
  action: Action;
}

export interface GetUserRoleResult {
  role: {
    permissions: Permission[];
  };
}
