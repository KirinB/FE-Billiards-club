export type MenuItemOnMenu = {
  menuId: number;
  menuItemId: number;
};

export type Menu = {
  id: number;
  name: string;
  menuId?: number;
  createdAt: string;
  updatedAt: string;
  menuItems: MenuItemOnMenu[];
};

export type MenuListParams = {
  page: number;
  pageSize: number;
  name?: string;
};

export type MenuListResponse = {
  menus: Menu[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export type MenuListResponseWithoutPagination = {
  menus: Menu[];
};

export type MenuUpdatePayload = {
  name: string;
};

export type MenuUpdateResponse = {
  menu: Menu;
};

export type MenuCreatePayload = {
  name: string;
};

export type MenuCreateResponse = {
  menu: Menu;
};
