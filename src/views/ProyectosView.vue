<script setup lang="ts">
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { ref, watch } from 'vue';
import type { Project } from '@/lib/CustomTypes';
import ProjectCard from '@/components/ProjectCard.vue';
import NewProjectDialog from '@/components/NewProjectDialog.vue';
import { projectsStore } from '@/stores/projectsStore';
const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
import { Input } from '@/components/ui/input';

const filter = ref<string>("");

watch(filter, (newVal) => {
  getProjects(newVal);
})


const getProjects = async (name:string = "") => {
  let res = null
  if (name === "") {
    res = await ProjectModule.ProjectManager.getProjects();
  } else {
    res = await ProjectModule.ProjectManager.getProjectsFromName(name);
  }
  if (!res.success) {
    toast.error(res.message);
  }
  console.log(res.projects);
  projectsStore.projects = res.projects;

}

</script>
<template>
  <div class="flex flex-col items-start gap-4">
    <h1>Proyectos</h1>
    <NewProjectDialog @refetch="getProjects(filter)" />

    <Input v-model="filter" placeholder="Filtrar por nombre" />


    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ProjectCard v-for="project in projectsStore.projects" 
      :key="project.id" :name="project.name" :state="project.state"
        :createdAt="new Date(project.created_at)" :project_id="project.id" 
        @refetch="getProjects(filter)"
        class="col-span-1"
        />
    </div>
  </div>
</template>