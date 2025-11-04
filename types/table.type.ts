export type TableType = "POOL" | "CAROM" | "ALL";

export type BilliardTable = {
  id: number;
  name: string;
  type: "POOL" | "CAROM";
  pricePerHour: number;
  status: string;
  createdAt: string;
};

export type ResponseGetTable = {
  tables: BilliardTable[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export interface PayloadCreateTable {
  name: string;
  type: TableType;
  pricePerHour: number;
}

export interface ResponseCreateTable {
  table: BilliardTable;
}

export interface PayloadUpdateTable extends PayloadCreateTable {}

export interface ResponseUpdateTable {
  table: BilliardTable;
}
