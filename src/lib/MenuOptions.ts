export type ProjectsViewOptions = "CreateProject" |"DeleteProject";

export type MembersViewOptions = "DeleteMember" | "AddMember";

export type ActivitiesViewOptions = "InsertObjective";

export type MenuName = "ProjectsView";
export type ProjectMenuName = "MembersView" | "ActivitiesView";

export type ViewOptions = {
  ProjectsView: "CreateProject" | "DeleteProject";
  Sidebar: "AdminPeople" | "Timesheets" | "AdminRoles"
  MembersView: "DeleteMember" | "AddMember";
  ActivitiesView: "InsertObjective" | "InsertActivity" |"EditObjective"|"DeleteObjective";
  ActivityView: "Assign" | "CreatePrecedence" | "DeleteActivity" | "EditActivity";
};
