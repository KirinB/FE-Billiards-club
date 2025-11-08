export type Order = {
  id: number;
  sessionId: number;
  createdById: number;
  createdAt: number;
};

export type CreateOrderPayload = {
  tableId: number;
  items: { menuItemId: number; quantity: number }[];
};

export type CreateOrderResponse = {
  order: Order;
};
