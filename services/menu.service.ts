import {
  MenuCreatePayload,
  MenuCreateResponse,
  MenuListParams,
  MenuListResponse,
  MenuListResponseWithoutPagination,
  MenuUpdatePayload,
  MenuUpdateResponse,
} from "@/types/menu.type";
import { privateClient } from "./apiClient";
import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";

const API_URL = "/menu";

export const menuService = {
  getList: async (params: MenuListParams): Promise<MenuListResponse> => {
    const { data } = await privateClient.get<ApiResponse<MenuListResponse>>(
      API_URL,
      {
        params,
      }
    );
    return data.metaData;
  },

  update: async (
    id: number,
    payload: MenuUpdatePayload
  ): Promise<MenuUpdateResponse> => {
    const { data } = await privateClient.patch<ApiResponse<MenuUpdateResponse>>(
      `${API_URL}/${id}`,
      payload
    );
    return data.metaData;
  },

  delete: async (id: number): Promise<ApiResponseDeleted> => {
    const { data } = await privateClient.delete<ApiResponseDeleted>(
      `${API_URL}/${id}`
    );
    return data;
  },

  getAllMenus: async (): Promise<MenuListResponseWithoutPagination> => {
    const { data } = await privateClient.get<
      ApiResponse<MenuListResponseWithoutPagination>
    >(`${API_URL}/all`);
    return data.metaData;
  },

  create: async (payload: MenuCreatePayload): Promise<MenuCreateResponse> => {
    const { data } = await privateClient.post<ApiResponse<MenuCreateResponse>>(
      API_URL,
      payload
    );

    return data.metaData;
  },
};
