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
  id: number;
  person_id: number;
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


export interface Objective {
  name: string;
  id: number;
}

export interface ProjectTreeEntry {
  objective_id: number;
  objective_name: string;
  activity_id: number;
  activity_name: string;
  deadline: string;
  estimated_hours: number;
}
export interface Activity {
  activity_id: number;
  activity_name: string;
  deadline: string;
  estimated_hours: number;
}

export interface ProjectTree {
  objective_id: number;
  objective_name: string;
  activities: Activity[];
}

export interface Assignment {
  first_name: string;
  last_name: string;
  cedula: number;
  member_id: number;
  id: number;
  person_id: number;
}

export type ActivityAndProgress = Activity & {
  progress?: number;
};

export interface Update {
  id: number;
  assignment_id: number;
  description: string;
  percentage: number;
  worked_hours: number;
  created_at: string;
  person_id: number;
  first_name: string;
  last_name: string;
}

export interface Option {
  menu_id: number;
  menu_name: string;
  name: string;
  id: number;
}

export interface SimpleOption {
  name: string;
  id: number;
}

export interface Menu {
  name: string;
  id: number;
  options: {
    name: string;
    id: number;
  }[];
}

export interface Profile {
  id: number;
  description: string;
}

export interface User {
  person_id: number;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  
}




export type MenuName = "ProjectsView" | "Sidebar" ;
export type ProjectMenuName = "MembersView" | "ActivitiesView" | "ActivityView" ;
export type ProjectRole = "Project Manager" | "Recurso"
