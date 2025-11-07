import {
  PayloadCreateTable,
  PayloadUpdateTable,
  ResponseCreateTable,
  ResponseGetTable,
  ResponseUpdateTable,
  TablesWithoutPaginationResponse,
  TableType,
} from "@/types/table.type";
import { privateClient } from "./apiClient";
import { ApiResponse, ApiResponseDeleted, SortOrder } from "@/types/api.type";

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

  delete: async (id: number): Promise<ApiResponseDeleted> => {
    const { data } = await privateClient.delete<ApiResponseDeleted>(
      `${API_URL}/${id}`
    );

    return data;
  },

  getListWithoutPagination:
    async (): Promise<TablesWithoutPaginationResponse> => {
      const { data } = await privateClient.get<
        ApiResponse<TablesWithoutPaginationResponse>
      >(`${API_URL}/all`);
      return data.metaData;
    },
};
