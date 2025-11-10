import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/stores/authSlice";
import storeInfoReducer from "@/stores/storeInfoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    storeInfo: storeInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
