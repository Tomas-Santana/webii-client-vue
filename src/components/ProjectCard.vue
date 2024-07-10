<script setup lang="ts">
defineProps<{
  name: string
  state: string
  createdAt: Date
  project_id: number
}>()
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import DeleteProjectDialog from './DeleteProjectDialog.vue';

const emit = defineEmits(['refetch'])

</script>

<template>

  <Card >
    <CardHeader>
      <CardTitle>
        {{ name }}
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