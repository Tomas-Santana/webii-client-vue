import type {
  Member,
  Person,
  Project,
  Role,
  MenuName,
  ProjectMenuName,
  Objective,
  ProjectTreeEntry,
  Activity,
  Assignment,
  Update,
  Option,
  Profile,
  User
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

    deleteObjective(objectiveId: number): {
      success: boolean;
      message: string;
    };

    editObjective(
      objectiveId: number,
      name: string
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
          success: false;
          message: string;
        }
      | {
          success: true;
          id: number;
        };
    deleteActivity(activityId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
        };
    editActivity(
      activityId: number,
      name: string,
      deadline: string,
      estimatedHours: number
    ):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
        };
    getActivitiesFromProject(projectId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
          data: Activity[];
        };
    createPrecedence(
      precedingId: number,
      subsequentId: number
    ):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
        };
    deletePrecedence(
      precedingId: number,
      subsequentId: number
    ):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
        };
    getActivity(activityId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
          data: Activity;
        };
    getActivityProgress(activityId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
          data: {
            sum: number | null;
          };
        };
    getPrecedingActivity(activityId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
          data: Activity[];
        };
  };
  AssignmentManager: {
    insertAssignment(
      memberId: number,
      activityId: number
    ): {
      success: boolean;
      message: string;
    };
    getActivityAssignments(activityId: number): {
      success: boolean;
      message: string;
      assignments: Assignment[];
    };
    deleteAssignment(assignmentId: number): {
      success: boolean;
      message: string;
    };
    getMemberAssignedActivitiesIds(
      personId: number,
      projectId: number
    ): {
      success: boolean;
      message: string;
      activityIds: number[];
    };
  };
  ProgressManager: {
    insertUpdate(
      assignmentId: number,
      description: string,
      percentage: number,
      workedHours: number
    ): {
      success: boolean;
      message: string;
    };
    deleteUpdate(updateId: number): {
      success: boolean;
      message: string;
    };
    getActivityUpdates(activityId: number):
      | {
          success: false;
          message: string;
        }
      | {
          success: true;
          data: Update[];
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
    deletePersonWithCedula(cedula: number): {
      success: boolean;
      message: string;
    }
    createPerson(
      firstName: string,
      lastName: string,
      cedula: number,
    )
      : {
        success: boolean;
        message: string;
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
    getUserList(): {
      success: boolean;
      message: string;
      data: User[];
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
    getAllOptions(): {
      success: boolean;
      message: string;
      data: Option[];
    };
    getProfileOptions(profileId: number): {
      success: boolean;
      message: string;
      data: Option[];
    };
    getSystemProfiles(): {
      success: boolean;
      message: string;
      data: Profile[];
    }
    createProfile(name: string, options: number[]): {
      success: boolean;
      message: string;
    }
    deleteProfile(profileId: number): {
      success: boolean;
      message: string;
    }
    getProfilesFromUser(userId: number): {
      success: boolean;
      message: string;
      data: Profile[];
    }
    assignProfileToUser(userId: number, profileId: number): {
      success: boolean;
      message: string;
    }
    unassignProfileFromUser(userId: number, profileId: number): {
      success: boolean;
      message: string;
    }
  };
};
