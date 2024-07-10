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
import type { Project } from '@/lib/CustomTypes';

defineProps<{
  projects: Project[]
}>()

</script>

<template>
  <Select>
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Tus proyectos" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Proyectos</SelectLabel>
        <SelectItem v-for="project in projects" :key="project.id" :value="project.id.toString()">
          {{ project.name }}
        </SelectItem>
        
      </SelectGroup>
    </SelectContent>
  </Select>
</template>