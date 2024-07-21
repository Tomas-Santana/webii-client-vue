<script setup lang="ts">
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import type { Objective, ProjectTreeEntry, ProjectTree } from '@/lib/CustomTypes';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { projectsStore } from '@/stores/projectsStore';
import AddObjectiveDialog from '@/components/Actividades/AddObjectiveDialog.vue';
import type { ViewOptions } from '@/lib/MenuOptions';
import { useProjectMenuOptions } from '@/lib/useMenuOptions';
import AddActivityDialog from '@/components/Actividades/AddActivityDialog.vue';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const projectEntries = ref<ProjectTreeEntry[]>([])
const route = useRoute()

const createActivityDialogOpen = ref(false)

const { options } = useProjectMenuOptions<ViewOptions["ActivitiesView"]>("ActivitiesView", Number(route.params.id.toString()))

const getObjectives = async () => {
  const response = await ProjectModule.ObjectiveManager.getProjectTree(
    parseInt(route.params.id.toString())
  );
  console.log(response)
  if (response.success) {
    projectEntries.value = response.projectTree
  }
}
getObjectives()

watch(route, () => {
  getObjectives()
})

const projectTree = computed<ProjectTree[]>(() => {
  // turn the projectEntries into a tree
  const tree: ProjectTree[] = []

  projectEntries.value.map(entry => {
    const alreadyExists = tree.find(t => t.objective_id === entry.objective_id)
    if (alreadyExists) {
      alreadyExists.activities.push({
        activity_name: entry.activity_name,
        deadline: entry.deadline,
        estimated_hours: entry.estimated_hours,
      })
    }
    else {
      tree.push({
        objective_id: entry.objective_id,
        objective_name: entry.objective_name,
        activities: entry.activity_name ? [{
          activity_name: entry.activity_name,
          deadline: entry.deadline,
          estimated_hours: entry.estimated_hours,
        }] : []
      })
    }
  })
  console.log(tree)

  return tree
})
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <h1 class="text-3xl">
      <span class="font-bold">
        Objetivos y Actividades -
      </span>
      {{ projectsStore.currentProject?.name }}
    </h1>
    <AddObjectiveDialog @refetch="getObjectives" v-if="options?.includes('InsertObjective')" />
    <div>
      <div class="flex flex-col gap-4">
        <ul class="list-disc ml-10">
          <li v-for="objective in projectTree" :key="objective.objective_id">
            <p class="text-xl font-bold">
              {{ objective.objective_name }}
            </p>

            <AddActivityDialog @refetch="getObjectives" :objectiveId="objective.objective_id" :objectiveName="objective.objective_name" />
            <ul class="list-disc ml-10">
              <li v-for="activity in objective.activities" :key="activity.activity_name">
                <p class="text-lg">
                  {{ activity.activity_name }}
                </p>
                <p>
                  Fecha límite: {{ activity.deadline }}
                </p>
                <p>
                  Horas estimadas: {{ activity.estimated_hours }}
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </div>

</template>