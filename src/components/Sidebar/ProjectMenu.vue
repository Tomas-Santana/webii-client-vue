<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { projectsStore } from '@/stores/projectsStore';
import ProjectOptions from './ProjectOptions.vue';
import { ref } from 'vue';
import Separator from '../ui/separator/Separator.vue';

const selectedProjectId = ref<number | null>(null);
const handleUpdate = (value: string) => {
  projectsStore.currentProject = projectsStore.projects.find(project => project.id === parseInt(value))!;
  selectedProjectId.value = parseInt(value);
}


</script>

<template>

  <div v-if="projectsStore.currentProject?.id"
    class="items-center text-slate-500 text-lg w-[360px] p-3 px-10 rounded-lg text-start leading-tight transition-all">
    Proyecto actual:
    <span class="font-bold"  >

      {{ projectsStore.currentProject?.name }}
    </span>
  </div>
  <Separator
    v-if="projectsStore.currentProject?.id"
  />
  <ProjectOptions v-if="projectsStore.currentProject?.id" :project-id="projectsStore.currentProject?.id" />
</template>