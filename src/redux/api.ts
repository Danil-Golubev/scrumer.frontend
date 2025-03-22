import { TaskType } from "../types";
import axios from "./axios";

export const fetchTaskStatusChange = async (_id: string, status: string) => {
  const { data } = await axios.post("/task/statuschange", {
    _id: _id,
    status: status,
  });
  return data;
};

export const fetchTaskUpdate = async (requestData: TaskType) => {
  const { data } = await axios.post("/task/update", requestData);
  return data;
};

export const fetchTaskDelete = async (taskId: string) => {
  const { data } = await axios.post("/task/delete", { taskId: taskId });
  return data;
};
