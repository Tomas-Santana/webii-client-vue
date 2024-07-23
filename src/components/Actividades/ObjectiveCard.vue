<script setup lang="ts">
import type { ProjectTree } from '@/lib/CustomTypes';
import { RouterLink } from 'vue-router';
const props = defineProps<{
  objective: ProjectTree,
  projectId: number,
  assignedActivitiesIds: number[]
}>()
import DeleteObjectiveDialog from './DeleteObjectiveDialog.vue';
import { Badge } from '../ui/badge';
import { Clock, Calendar } from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';



</script>

<template>


  <Card class=" min-w-96">
    <CardHeader>
      <CardTitle class="flex justify-between items-center">
        {{ objective.objective_name }}
        <div>
          <slot name="header" ></slot>
        </div>
      </CardTitle>
      <CardDescription>
        {{ 
          objective.activities.length > 0 ? "Actividades" : "No hay actividades"
          }}
      </CardDescription>


      <CardContent class="flex flex-col gap-4 p-2">
        <div v-for="activity in objective.activities" class="rounded-md border p-4 flex flex-col gap-2 items-start shadow-md">
          <RouterLink
            :to="`/${projectId}/actividad/${activity.activity_id}`"
            class="text-blue-500 hover:underline"
          >{{ activity.activity_name }}</RouterLink>
            <div class="flex flex-wrap gap-2">

              <Badge>
                <Clock :size="16" class="mr-2" />
                {{ activity.estimated_hours }} horas
              </Badge>
              <Badge variant="secondary" >
                <Calendar :size="16" class="mr-2" />
                {{ new Date(activity.deadline).toLocaleDateString("es-ES",
                  { day: 'numeric', month: "short" }
                ) }}
              </Badge>
              <Badge variant="secondary"
                v-if="assignedActivitiesIds.includes(activity.activity_id)"
                class="bg-green-500 text-white"
              >
                Asignado
              </Badge>
            </div>

        </div>
      </CardContent>
      <CardFooter class="p-4 flex flex-wrap gap-2">
        <slot name="footer"></slot>
        
      </CardFooter>
    </CardHeader>


  </Card>

</template>