import type {
  Member,
  Person,
  Project,
  Role,
  MenuName,
  ProjectMenuName,
  Objective,
  ProjectTreeEntry,
} from "./CustomTypes";

export type CalculatorModuleType = {
  CalculatorClass: {
    sum(a: number, b: number): number;
    sub(a: number, b: number): number;
    mul(a: number, b: number): number;
    div(a: number, b: number): number;
  };
};

export type ProjectModuleType = {
  ProjectManager: {
    logSession(): void;
    createProject(name: string): {
      success: boolean;
      message: string;
      id: number;
    };
    getProjects(): {
      success: boolean;
      message: string;
      projects: Project[];
    };
    getProjectsFromName(name: string): {
      success: boolean;
      message: string;
      projects: Project[];
    };
    deleteProject(id: number): {
      success: boolean;
      message: string;
    };
  };
  MemberManager: {
    getProjectMembers(projectId: number): {
      success: boolean;
      message: string;
      members: Member[];
    };
    deleteMember(
      projectId: number,
      cedula: number
    ): {
      success: boolean;
      message: string;
    };
    insertMember(
      projectId: number,
      cedula: number,
      roleId: number
    ): {
      success: boolean;
      message: string;
    };
    getAllRoles(): {
      success: boolean;
      message: string;
      roles: Role[];
    };
  };
  ObjectiveManager: {
    insertObjective(
      projectId: number,
      objective: string
    ): {
      success: boolean;
      message: string;
    };
    getObjectives(projectId: number): {
      success: boolean;
      message: string;
      objectives: Objective[];
    };
    getProjectTree(projectId: number): {
      success: boolean;
      message: string;
      projectTree: ProjectTreeEntry[];
    };
  };
  ActivityManager: {
    createActivity(
      objectiveID: number,
      name: string,
      deadline: string,
      estimatedHours: number
    ):
      | {
          success: boolean;
          message: string;
        }
      | {
          success: boolean;
          id: number;
        };
  };
};

export type UserModuleType = {
  PeopleManager: {
    getPeople(): {
      success: boolean;
      message: string;
      people: Person[];
    };
  };
  UserManager: {
    getRoles(): {
      success: boolean;
      message?: string;
      data: Role[];
    };
    switchRoles(roleId: number): {
      success: boolean;
      message: string;
    };
  };
};

export type OptionModuleType = {
  OptionManager: {
    getMenuOptions(name: MenuName): {
      success: boolean;
      message: string;
      data: string[];
    };
    getProjectMenuOptions(
      name: ProjectMenuName,
      projectId: number
    ): {
      success: boolean;
      message: string;
      data: string[];
    };
  };
};
