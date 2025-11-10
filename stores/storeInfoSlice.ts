import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { privateClient } from "@/services/apiClient";
import { billConfig } from "@/configs/bill.config";
import { ApiResponse } from "@/types/api.type";

export interface StoreInfoData {
  id?: number;
  name: string;
  address: string;
  phone: string;
  logo?: string | null;
  vat?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreInfoState extends StoreInfoData {
  status: "idle" | "loading" | "failed";
  error?: string | null;
}

const initialState: StoreInfoState = {
  name: billConfig.name,
  address: billConfig.address,
  phone: billConfig.phone,
  logo: null,
  vat: null,
  status: "idle",
  error: null,
};

const API_URL = "store-info";

// Fetch store info
export const fetchStoreInfo = createAsyncThunk("storeInfo/fetch", async () => {
  const res = await privateClient.get<ApiResponse<{ info: StoreInfoData }>>(
    API_URL
  );
  return res.data.metaData.info;
});

// Update store info
export const updateStoreInfo = createAsyncThunk(
  "storeInfo/update",
  async (payload: Partial<StoreInfoData>) => {
    const res = await privateClient.patch<ApiResponse<{ info: StoreInfoData }>>(
      API_URL,
      payload
    );
    return res.data.metaData.info;
  }
);

const slice = createSlice({
  name: "storeInfo",
  initialState,
  reducers: {
    setLocalStoreInfo(state, action: PayloadAction<Partial<StoreInfoData>>) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreInfo.fulfilled, (state, action) => {
        state.status = "idle";
        Object.assign(state, action.payload);
      })
      .addCase(fetchStoreInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Fetch failed";
      })
      .addCase(updateStoreInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStoreInfo.fulfilled, (state, action) => {
        state.status = "idle";
        Object.assign(state, action.payload);
      })
      .addCase(updateStoreInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Update failed";
      });
  },
});

export const { setLocalStoreInfo } = slice.actions;
export default slice.reducer;
