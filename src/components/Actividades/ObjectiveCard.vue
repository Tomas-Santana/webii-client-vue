<script setup lang="ts">
import type { ProjectTree } from '@/lib/CustomTypes';
import { RouterLink } from 'vue-router';
const props = defineProps<{
  objective: ProjectTree,
  projectId: number
}>()
import { Badge } from '../ui/badge';
import { Clock, Calendar } from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';



</script>

<template>


  <Card>
    <CardHeader>
      <CardTitle class="flex justify-between items-center">
        {{ objective.objective_name }}
        <slot></slot>
      </CardTitle>
      <CardDescription>
        {{ 
          objective.activities.length > 0 ? "Actividades" : "No hay actividades"
          }}
      </CardDescription>


      <CardContent class="flex flex-wrap gap-4 ">
        <div v-for="activity in objective.activities" class="rounded-md border p-4 flex flex-col gap-2 items-start">
          <RouterLink
            :to="`/${projectId}/actividad/${activity.activity_id}`"
            class="text-blue-500 hover:underline"
          >{{ activity.activity_name }}</RouterLink>

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

        </div>
      </CardContent>
    </CardHeader>


  </Card>

</template>