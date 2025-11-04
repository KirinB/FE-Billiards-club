import {
  PayloadCreateTable,
  PayloadUpdateTable,
  ResponseCreateTable,
  ResponseGetTable,
  ResponseUpdateTable,
  TableType,
} from "@/types/table.type";
import { privateClient } from "./apiClient";
import { ApiResponse, SortOrder } from "@/types/api.type";

const API_URL = "/tables";

export const tableService = {
  getList: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    priceSort?: SortOrder;
    type?: TableType;
  }): Promise<ApiResponse<ResponseGetTable>> => {
    const filteredParams = { ...params };
    if (filteredParams.type === "ALL") {
      delete filteredParams.type;
    }

    const query = Object.fromEntries(
      Object.entries(filteredParams).filter(([_, v]) => v !== undefined)
    );
    const { data } = await privateClient.get<ApiResponse<ResponseGetTable>>(
      API_URL,
      {
        params: query,
      }
    );
    return data;
  },

  create: async (payload: PayloadCreateTable): Promise<ResponseCreateTable> => {
    const { data } = await privateClient.post<ApiResponse<ResponseCreateTable>>(
      API_URL,
      payload
    );

    return data.metaData;
  },

  update: async (
    id: number,
    payload: PayloadUpdateTable
  ): Promise<ResponseUpdateTable> => {
    const { data } = await privateClient.patch<
      ApiResponse<ResponseUpdateTable>
    >(`${API_URL}/${id}`, payload);

    return data.metaData;
  },
};
