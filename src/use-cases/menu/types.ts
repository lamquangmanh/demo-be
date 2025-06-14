export interface SubMenu {
  resourceId: string;
  name: string;
  url: string;
}

export interface Menu {
  moduleId: string;
  name: string;
  url: string;
  icon?: string;
  subMenus: SubMenu[];
}

export interface SuperMenu {
  productId: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
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
  icon?: string;
  product: Product;
}

export interface Resource {
  resourceId: string;
  name: string;
  url?: string;
  icon?: string;
  module: Module;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  url?: string;
  icon?: string;
}

export interface Permission {
  action: Action;
  resource: Resource;
}

export interface GetUserRoleResult {
  role: {
    permissions: Permission[];
  };
}
