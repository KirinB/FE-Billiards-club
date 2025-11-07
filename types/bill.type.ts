export type BillItemType = {
  id: number;
  menuItem: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
};

export type Bill = {
  id: number;
  sessionId: number;
  totalAmount: number;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  items: BillItemType[];
};

export interface ParamsGetListBill {
  page?: number;
  pageSize?: number;
}

export interface ResponseGetListBill {
  bills: Bill[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IPayloadUpdateBill {
  totalAmount?: number;
  note?: string;
}

export interface CreateBillPayload {
  tableId: number;
}

export interface CreateBillResponse {
  bill: Bill & {
    hoursPlayed: number;
    sessionAmount: number;
    totalOrder: number;
  };
}
