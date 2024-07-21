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

const handleUpdate = (value: string) => {
  projectsStore.currentProject = projectsStore.projects.find(project => project.id === parseInt(value))!;

}
</script>

<template>
  <Select 
    @update:model-value="handleUpdate($event)"
    
  >
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Selecciona un proyecto" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Mis proyectos</SelectLabel>
        <SelectItem v-for="project in projectsStore.projects" :key="project.id" :value="project.id.toString()">
          {{ project.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>