import { type Member, type Person, type Project } from "./CustomTypes";

export type CalculatorModuleType = {
    CalculatorClass: {
        sum(a: number, b: number): number
        sub(a: number, b: number):  number
        mul(a: number, b: number): number;
        div(a: number, b: number): number
    }
};

export type ProjectModuleType = {
    ProjectManager: {
        logSession(): void
        createProject(name: string): {
            success: boolean
            message: string
            id: number
        }
        getProjects(): {
            success: boolean
            message: string
            projects: Project[]
        }
        getProjectsFromName(name: string): {
            success: boolean
            message: string
            projects: Project[]
        }
        deleteProject(id: number): {
            success: boolean
            message: string
        }
    }
    MemberManager: {
        getProjectMembers(projectId: number): {
            success: boolean
            message: string
            members: Member[]
        }
        deleteMember(projectId: number, cedula: number): {
            success: boolean
            message: string
        }
        insertMember(projectId: number, cedula: number): {
            success: boolean
            message: string
        }
    }
}

export type UserModuleType = {
    PeopleManager: {
        getPeople(): {
            success: boolean
            message: string
            people: Person[]
        }
    }
} 