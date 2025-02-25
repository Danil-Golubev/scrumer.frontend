export type Team = {
  id: string;
};

export type User = {
  name: string; //TODO: доделать
  team: Team;
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
