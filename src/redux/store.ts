import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = {
  auth: {
    data: string;
    loading: boolean;
    error: string;
  };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
