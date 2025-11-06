import {
  MenuItemCreatePayload,
  MenuItemCreateResponse,
  MenuItemListParams,
  MenuItemListResponse,
  MenuItemUpdatePayload,
  MenuItemUpdateResponse,
} from "@/types/menu-item.type";
import { privateClient } from "./apiClient";
import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";

const API_URL = "/menu-item";

export const menuItemService = {
  getList: async (
    params: MenuItemListParams
  ): Promise<MenuItemListResponse> => {
    const { data } = await privateClient.get<ApiResponse<MenuItemListResponse>>(
      API_URL,
      {
        params,
      }
    );

    return data.metaData;
  },

  update: async (
    id: number,
    payload: MenuItemUpdatePayload
  ): Promise<MenuItemUpdateResponse> => {
    const { data } = await privateClient.patch<
      ApiResponse<MenuItemUpdateResponse>
    >(`${API_URL}/${id}`, payload);

    return data.metaData;
  },

  delete: async (id: number): Promise<ApiResponseDeleted> => {
    const { data } = await privateClient.delete<ApiResponseDeleted>(
      `${API_URL}/${id}`
    );

    return data;
  },

  create: async (
    payload: MenuItemCreatePayload
  ): Promise<MenuItemCreateResponse> => {
    const { data } = await privateClient.post<
      ApiResponse<MenuItemCreateResponse>
    >(API_URL, payload);
    return data.metaData;
  },
};
