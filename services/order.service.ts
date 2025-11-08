import { CreateOrderPayload, CreateOrderResponse } from "@/types/order.type";
import { privateClient } from "./apiClient";
import { ApiResponse } from "@/types/api.type";

const API_URL = "/orders";

export const orderService = {
  create: async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const { data } = await privateClient.post<ApiResponse<CreateOrderResponse>>(
      API_URL,
      payload
    );
    return data.metaData;
  },
};
