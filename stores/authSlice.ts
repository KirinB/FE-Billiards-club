import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  name: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
  sub: string;
}

enum UserRole {
  "STAFF",
  "ADMIN",
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isInitialized: boolean;
  isLoading: boolean;
}

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

let decodedUser: AuthUser | null = null;
if (savedToken) {
  try {
    const decoded = jwtDecode<JwtPayload>(savedToken);
    decodedUser = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (e) {
    console.error("Decode failed", e);
  }
}

const initialState: AuthState = {
  accessToken: savedToken,
  user: decodedUser,
  isInitialized: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      try {
        const decoded = jwtDecode<JwtPayload>(action.payload);
        state.user = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
        localStorage.setItem("accessToken", action.payload);
        state.isInitialized = true;
      } catch (e) {
        console.error("Decode failed", e);
      }
    },
    clearUser: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setUser, clearUser, setInitialized } = authSlice.actions;
export default authSlice.reducer;
