import { privateClient } from "./apiClient";
import {
  Bill,
  CreateBillPayload,
  CreateBillResponse,
  GetBillDetail,
  IPayloadUpdateBill,
  ParamsGetListBill,
  ResponseGetListBill,
} from "@/types/bill.type";
import { ApiResponse, ApiResponseDeleted } from "@/types/api.type";

const API_URL = "/bills";

export const billService = {
  getList: async (params: ParamsGetListBill): Promise<ResponseGetListBill> => {
    const { data } = await privateClient.get<ApiResponse<ResponseGetListBill>>(
      API_URL,
      { params }
    );
    return data.metaData;
  },

  getDetail: async (id: number): Promise<GetBillDetail> => {
    const { data } = await privateClient.get<ApiResponse<GetBillDetail>>(
      `${API_URL}/${id}`
    );
    return data.metaData;
  },

  update: async (id: number, payload: IPayloadUpdateBill): Promise<Bill> => {
    const { data } = await privateClient.patch<ApiResponse<Bill>>(
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

  create: async (payload: CreateBillPayload): Promise<CreateBillResponse> => {
    const { data } = await privateClient.post<ApiResponse<CreateBillResponse>>(
      `${API_URL}`,
      payload
    );
    return data.metaData;
  },
};
