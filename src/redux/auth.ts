import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios";
import { LoginParams } from "../types";

const initialState = {
  data: "",
  loading: false,
  error: "",
};

export const fetchLogin = createAsyncThunk<string, LoginParams>(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk<string, LoginParams>(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuth", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as unknown as string;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as unknown as string;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as unknown as string;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных";
      });
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);
export const selectUser = (state: any) => state.auth.data;
export default authSlice.reducer;
export const { logout } = authSlice.actions;
