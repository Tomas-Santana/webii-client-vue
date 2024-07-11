<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projectsStore } from '@/stores/projectsStore';
import ProjectSelect from './ProjectSelect.vue';



console.log(projectsStore.currentProject)
const getLink = (route: string) => {
  if (projectsStore.currentProject) {
    return `/${projectsStore.currentProject.id}/${route}`
  }
  return "/"
}

</script>


<template v-if="projectsStore.currentProject">
  <RouterLink :to="getLink('miembros')" role="button" tabindex="0"
    class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
    <div class="grid place-items-center mr-4">
    </div>Miembros
  </RouterLink>
  <RouterLink :to="getLink('actividades')" role="button" tabindex="0"
    class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
    <div class="grid place-items-center mr-4">
    </div>Actividades
  </RouterLink>
  <RouterLink :to="getLink('tiempo')" role="button" tabindex="0"
    class="items-center font-medium text-slate-500 w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
    <div class="grid place-items-center mr-4">
    </div>Hoja de tiempo
  </RouterLink>
</template>
