import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios";
import { Team } from "../types";

const initialState = {
  data: "",
  loading: false,
  error: "",
};

export const fetchCreateTeam = createAsyncThunk<string, Team>(
  "team/create",
  async (params) => {
    const { data } = await axios.post("/team/create", params);
    return data;
  }
);

export const authSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as unknown as string;
      })
      .addCase(fetchCreateTeam.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных";
      });
  },
});
