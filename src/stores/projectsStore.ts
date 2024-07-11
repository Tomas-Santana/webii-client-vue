import { reactive } from "vue";
import type { Project } from "@/lib/CustomTypes";

export const projectsStore = reactive({
    projects: [] as Project[],
    currentProject: null as Project | null,
});