import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios";
import { TaskType } from "../types";

const initialState = {
  data: "",
  loading: false,
  error: "",
};

export const fetchCreateTask = createAsyncThunk<string, TaskType>(
  "task/create",
  async (params) => {
    const { data } = await axios.post("/task/create", params);
    return data;
  }
);

export const authSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as unknown as string;
      })
      .addCase(fetchCreateTask.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных";
      });
  },
});
