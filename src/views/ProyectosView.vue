<script setup lang="ts">
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { ProjectModuleType, OptionModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { computed, ref, watch } from 'vue';
import type { Project } from '@/lib/CustomTypes';
import ProjectCard from '@/components/ProjectCard.vue';
import NewProjectDialog from '@/components/NewProjectDialog.vue';
import { projectsStore } from '@/stores/projectsStore';

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, "OptionModule");
import { Input } from '@/components/ui/input';
import type { ProjectsViewOptions } from '@/lib/MenuOptions';

const filter = ref<string>("");


const avOptions = ref<ProjectsViewOptions[]>([]);

const getOptions = async () => {
  const res = await OptionModule.OptionManager.getMenuOptions("ProjectsView");
  if (!res.success) {
    toast.error(res.message);
  }
  // add all options to the avOptions array
  console.log(res.data);
  avOptions.value = res.data as ProjectsViewOptions[];

}

getOptions();

const getProjects = async (name: string = "") => {
  let res = null
  if (avOptions.value.includes('ViewAllProjects')) {
    console.log("ViewAllProjects");
    if (name === "") {
      res = await ProjectModule.ProjectManager.getAllProjects();
    } else {
      res = await ProjectModule.ProjectManager.getAllProjectsFromName(name);
    }
  } else {
    if (name === "") {
      res = await ProjectModule.ProjectManager.getProjects();
    } else {
      res = await ProjectModule.ProjectManager.getProjectsFromName(name);
    }
  }
  if (!res.success) {
    toast.error(res.message);
  }
  projectsStore.projects = res.projects;

}
getProjects();
watch(filter, (newVal) => {
  getProjects(newVal);
});

watch(avOptions, () => {
  getProjects(filter.value);
});


const canDeleteProyect = computed(() => avOptions.value.includes('DeleteProject'));

</script>
<template>
  <div class="flex flex-col items-start gap-4">
    <h1 class="text-5xl font-bold">Proyectos</h1>
    <NewProjectDialog @refetch="getProjects(filter)" v-if="avOptions.includes('CreateProject')" />

    <Input v-model="filter" placeholder="Filtrar por nombre" />


    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ProjectCard v-for="project in projectsStore.projects" 
        key="project.id" 
        :project="project"
        @refetch="getProjects(filter)" class="col-span-1"
        :can-delete="canDeleteProyect"
        />
    </div>
  </div>
</template>