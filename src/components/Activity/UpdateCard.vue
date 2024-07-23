<script setup lang="ts">
import type { Project, Update } from '@/lib/CustomTypes';
const props = defineProps<{
  update: Update,
  myAssignmentId?: number 
}>()
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import DeleteUpdateDialog from './DeleteUpdateDialog.vue';

const emit = defineEmits(['refetch'])

console.log(props.update)

</script>

<template>


  <Card>
    <CardHeader>
      <CardTitle>
        {{ update.first_name }} {{ update.last_name }}
      </CardTitle>

      <CardContent>
        <CardDescription>
          Creado: {{ new Date(update.created_at).toLocaleDateString("es-ES",
            { year: 'numeric', month: 'long', day: 'numeric' }
          ) }}
        </CardDescription>
        <CardDescription>
          Horas trabajadas: {{ update.worked_hours }} horas
        </CardDescription>
        <CardDescription>
          Porcentaje completado: {{ update.percentage }}%
        </CardDescription>
        <p>
          <strong>Descripción:</strong>
        </p>
        <p>
          {{ update.description }}
        </p>
      </CardContent>
    </CardHeader>
    <CardFooter>
      <DeleteUpdateDialog 
      v-if="myAssignmentId === update.assignment_id"
      :updateId="props.update.id" @refetch="emit('refetch')" />
    </CardFooter>

  </Card>

</template>