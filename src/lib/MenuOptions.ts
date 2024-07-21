export type ProjectsViewOptions = "CreateProject";

export type MembersViewOptions = "DeleteMember" | "AddMember";

export type ActivitiesViewOptions = "InsertObjective";

export type MenuName = "ProjectsView";
export type ProjectMenuName = "MembersView" | "ActivitiesView";

export type ViewOptions = {
  ProjectsView: "CreateProject";
  MembersView: "DeleteMember" | "AddMember";
  ActivitiesView: "InsertObjective";
};
