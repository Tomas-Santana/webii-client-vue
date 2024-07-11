<script setup lang="ts">
const props = defineProps<{
  name: string
  state: string
  createdAt: Date
  project_id: number
}>()
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import DeleteProjectDialog from './DeleteProjectDialog.vue';
import { RouterLink } from 'vue-router';
import { projectsStore } from '@/stores/projectsStore';

const emit = defineEmits(['refetch'])

const handleClick = () => {
  projectsStore.currentProject = projectsStore.projects.find(project => project.id === props.project_id)!
}

</script>

<template>


  <Card>
    <CardHeader>
      <CardTitle>
        <RouterLink :to="'/' + project_id + '/miembros'" @click="handleClick()" class="hover:underline">
          {{ name }}
        </RouterLink>

      </CardTitle>
      <span>
        #{{ project_id }}
      </span>
      <CardContent>
        <p>Estado: {{ state }}</p>
        <p>Creado: {{
          createdAt.toLocaleDateString() + " " + createdAt.toLocaleTimeString()
          }}</p>
      </CardContent>
    </CardHeader>
    <CardFooter>
      <DeleteProjectDialog :projectId="project_id" @refetch="emit('refetch')" />
    </CardFooter>

  </Card>

</template>