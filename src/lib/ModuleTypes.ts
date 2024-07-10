import { type Project } from "./CustomTypes";

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
}