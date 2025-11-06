import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";
import { privateClient } from "./apiClient";
import {
  CategoryCreatePayload,
  CategoryCreateResponse,
  CategoryGetListParams,
  CategoryListResponse,
  CategoryListResponseWithoutPagination,
  CategoryUpdatePayload,
  CategoryUpdateResponse,
} from "@/types/category.type";

const API_URL = "category";

export const categoryService = {
  getList: async (
    params: CategoryGetListParams
  ): Promise<CategoryListResponse> => {
    const { data } = await privateClient.get<ApiResponse<CategoryListResponse>>(
      API_URL,
      {
        params,
      }
    );

    return data.metaData;
  },

  getAllCategories:
    async (): Promise<CategoryListResponseWithoutPagination> => {
      const { data } = await privateClient.get<
        ApiResponse<CategoryListResponseWithoutPagination>
      >(`${API_URL}/all`);
      return data.metaData;
    },

  update: async (
    id: number,
    payload: CategoryUpdatePayload
  ): Promise<CategoryUpdateResponse> => {
    const { data } = await privateClient.patch<
      ApiResponse<CategoryUpdateResponse>
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
    payload: CategoryCreatePayload
  ): Promise<CategoryCreateResponse> => {
    const { data } = await privateClient.post<
      ApiResponse<CategoryCreateResponse>
    >(API_URL, payload);
    return data.metaData;
  },
};
