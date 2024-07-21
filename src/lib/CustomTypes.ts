export interface Project {
  id: number;
  name: string;
  state: string;
  created_at: string;
  profile: ProjectRole;
}
export interface Member {
  first_name: string;
  last_name: string;
  cedula: number;
  email: string;
  description: string;
}

export interface Person {
  first_name: string;
  last_name: string;
  cedula: number;
}

export interface Role {
  id: 1 | 2 | 4 | 5 | 6;
  description: string;
}

export interface Option {
  name: string;
}

export interface Objective {
  name: string;
  id: number;
}

export interface ProjectTreeEntry {
  objective_id: number;
  objective_name: string;
  activity_name: string;
  deadline: string;
  estimated_hours: number;
}
export interface Activity {
  activity_name: string;
  deadline: string;
  estimated_hours: number;
}

export interface ProjectTree {
  objective_id: number;
  objective_name: string;
  activities: Activity[];
}



export type MenuName = "ProjectsView" ;
export type ProjectMenuName = "MembersView" | "ActivitiesView"
export type ProjectRole = "Project Manager" | "Recurso"
