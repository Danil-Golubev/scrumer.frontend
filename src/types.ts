export type User = {
  name: string; //TODO: доделать
  team: Team;
};

export type Employee = {
  user: string;
  position: string;
};

export type Team = {
  title: string;
  description: string;
  deadline: string;
  sprintDuration: string;
  members?: Employee[];
  tasks?: Task[];
};

export type Task = {
  title: String;
  description: String;
  deadline: Date;
  teamId: string;
  assignedTo: String;
};

export interface LoginParams {
  email: string;
  password: string;
}
