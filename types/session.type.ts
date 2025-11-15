import { Order } from "./order.type";

export interface CreateSessionPayload {
  tableId: number;
}

export interface CreateSessionResponse {
  session: Session;
}

export type Session = {
  id: number;
  tableId: number;
  staffId: number;
  startTime: string;
  endTime: string | null;
  createdAt: string;
  _count?: {
    orders: number;
  };
  orders: Order[];
};
