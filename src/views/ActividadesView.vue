<script setup lang="ts">
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import type { Objective, ProjectTreeEntry, ProjectTree, Member } from '@/lib/CustomTypes';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { projectsStore } from '@/stores/projectsStore';
import AddObjectiveDialog from '@/components/Actividades/AddObjectiveDialog.vue';
import type { ViewOptions } from '@/lib/MenuOptions';
import { useProjectMenuOptions } from '@/lib/useMenuOptions';
import AddActivityDialog from '@/components/Actividades/AddActivityDialog.vue';
import ObjectiveCard from '@/components/Actividades/ObjectiveCard.vue';

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const projectEntries = ref<ProjectTreeEntry[]>([])
const route = useRoute()

const createActivityDialogOpen = ref(false)

const { options } = useProjectMenuOptions<ViewOptions["ActivitiesView"]>("ActivitiesView", Number(route.params.id.toString()))

const getProjectTree = async () => {
  const projectId = parseInt(route.params.id?.toString())
  if (!projectId) return
  const response = await ProjectModule.ObjectiveManager.getProjectTree(
    projectId
  );
  console.log(response)
  if (response.success) {
    projectEntries.value = response.projectTree
  }
}
getProjectTree()

const members = ref<Member[]>([]);
const getMembers = async () => {
  const res = await ProjectModule.MemberManager.getProjectMembers(
    parseInt(route.params.id.toString())
  );
  console.log(res);
  members.value = res.members;
}
getMembers();

watch(route, () => {
  getProjectTree()
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
        activity_id: entry.activity_id,
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
          activity_id: entry.activity_id,
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
    <AddObjectiveDialog @refetch="getProjectTree" v-if="options?.includes('InsertObjective')" />
    <div>
      <div class="grid grid-cols-2 gap-4">
        <ObjectiveCard v-for="objective in projectTree" :objective="objective"
          :projectId="parseInt(route.params.id.toString())" :key="objective.objective_id"
          class="col-span-2 md:col-span-1">
          <AddActivityDialog @refetch="getProjectTree" :objectiveId="objective.objective_id"
            :objectiveName="objective.objective_name" :projectId="parseInt(route.params.id.toString())"
            :projectTree="projectEntries"
            :members="members"
            v-if="options?.includes('InsertActivity')"
            />
        </ObjectiveCard>
      </div>

    </div>
  </div>

</template>