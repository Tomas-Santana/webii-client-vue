<script setup lang="ts">
import type { Project } from '@/lib/CustomTypes';
const props = defineProps<{
  project: Project
}>()
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import DeleteProjectDialog from './DeleteProjectDialog.vue';
import { RouterLink } from 'vue-router';
import { projectsStore } from '@/stores/projectsStore';
import { currentUserStore } from '@/stores/currentUserStore';

const emit = defineEmits(['refetch'])

const handleClick = () => {
  projectsStore.currentProject = projectsStore.projects.find(project => project.id === props.project.id)!
}
const createdAt = new Date(props.project.created_at);
console.log(props.project)

</script>

<template>


  <Card>
    <CardHeader>
      <CardTitle>
        <RouterLink :to="'/' + project.id + '/miembros'" @click="handleClick()" class="hover:underline">
          {{ project.name }}
        </RouterLink>

      </CardTitle>
      <span>
        #{{ project.id }}
      </span>
      <CardContent>
        <p>Estado: {{ project.state }}</p>
        <p>Creado: {{
          createdAt.toLocaleDateString() + " " + createdAt.toLocaleTimeString()
          }}</p>
      </CardContent>
    </CardHeader>
    <CardFooter>
      <DeleteProjectDialog :projectId="project.id" @refetch="emit('refetch')" v-if="project.profile=='Project Manager' || currentUserStore.role == 'Admin'" />
    </CardFooter>

  </Card>

</template>