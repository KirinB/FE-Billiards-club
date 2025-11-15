import { MenuItem } from "./menu-item.type";

export type Order = {
  id: number;
  sessionId: number;
  createdById: number;
  createdAt: number;
  orderItems: OrderItem[];
};

export type CreateOrderPayload = {
  tableId: number;
  items: { menuItemId: number; quantity: number }[];
};

export type CreateOrderResponse = {
  order: Order;
};

export type OrderItem = {
  menuItem: MenuItem;
  quantity?: number;
};
