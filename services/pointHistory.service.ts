import {
  CreatePointHistoryPayload,
  CreatePointHistoryResponse,
  GetDetailPointHistoryResponse,
  GetListPointHistoryQuery,
  GetListPointHistoryResponse,
  UpdatePointHistoryPayload,
  UpdatePointHistoryResponse,
} from "@/types/pointHistory.type";
import { privateClient } from "./apiClient";
import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";

const API_URL = "/point-history";

export const pointHistoryService = {
  getList: async (
    params: GetListPointHistoryQuery
  ): Promise<GetListPointHistoryResponse> => {
    const { data } = await privateClient.get<
      ApiResponse<GetListPointHistoryResponse>
    >(API_URL, {
      params,
    });
    return data.metaData;
  },

  getDetail: async (id: number): Promise<GetDetailPointHistoryResponse> => {
    const { data } = await privateClient.get<
      ApiResponse<GetDetailPointHistoryResponse>
    >(`${API_URL}/${id}`);
    return data.metaData;
  },

  update: async (
    id: number,
    payload: UpdatePointHistoryPayload
  ): Promise<UpdatePointHistoryResponse> => {
    const { data } = await privateClient.patch<
      ApiResponse<UpdatePointHistoryResponse>
    >(`${API_URL}/${id}`, payload);
    return data.metaData;
  },

  create: async (
    payload: CreatePointHistoryPayload
  ): Promise<CreatePointHistoryResponse> => {
    const { data } = await privateClient.post<
      ApiResponse<CreatePointHistoryResponse>
    >(API_URL, payload);

    return data.metaData;
  },

  delete: async (id: number): Promise<ApiResponseDeleted> => {
    const { data } = await privateClient.delete<ApiResponseDeleted>(
      `${API_URL}/${id}`
    );
    return data;
  },
};
