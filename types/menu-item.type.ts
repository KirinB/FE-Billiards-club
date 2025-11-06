import { Category } from "./category.type";
import { Menu } from "./menu.type";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  menus: Menu[];
  category: Category;
};

export type MenuItemListResponse = {
  items: MenuItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export type MenuItemListParams = {
  page: number;
  pageSize: number;
  name: string;
};

export type MenuItemUpdatePayload = {
  name: string;
  price: number;
  available: boolean;
  menuIds: number[];
  categoryId: number;
};

export type MenuItemUpdateResponse = {
  item: MenuItem;
};

export type MenuItemCreatePayload = {
  name: string;
  price: number;
  available: boolean;
  menuIds: number[];
  categoryId: number;
};

export type MenuItemCreateResponse = {
  item: MenuItem;
};
