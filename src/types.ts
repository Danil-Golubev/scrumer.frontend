import { JSX } from "react";

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  tgId: string;
  team: Team;
};

export type Employee = {
  _id?: string;
  user: User;
  position: string;
};

export type Team = {
  title: string;
  description: string;
  deadline: string;
  sprintDuration: string;
  members?: Employee[];
  tasks?: TaskType[];
};

export type TaskType = {
  _id?: string;
  lastName?: any;
  firstName?: any;
  team?: string;
  title: string;
  status: string;
  description: string;
  deadline: Date;
  performer: Employee;
};

export interface LoginParams {
  email: string;
  password: string;
}
