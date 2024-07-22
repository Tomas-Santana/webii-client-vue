<script setup lang="ts">
import { useRoute } from 'vue-router';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import type { Activity, Assignment, Member } from '@/lib/CustomTypes';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { Progress } from '@/components/ui/progress';
import MemberDropdown from '@/components/Activity/MemberDropdown.vue';
import PrecedenceDropdown from '@/components/Activity/PrecedenceDropdown.vue';
import { Plus, Clock, Calendar } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import AddAssignmentDialog from '@/components/Activity/AddAssignmentDialog.vue';
import AddPrecedenceDialog from '@/components/Activity/AddPrecedenceDialog.vue';

const route = useRoute()

const activityId = computed(() => route.params.activityId)
const projectId = computed(() => route.params.projectId)
const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const activity = ref<Activity | null>(null)
const activityProgress = ref<number>(0)
const assignments = ref<Assignment[]>([])
const getActivity = async () => {
  const res = await ProjectModule.ActivityManager.getActivity(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    activity.value = res.data;
    return
  }
  toast.error("Error al cargar la actividad")
}

const getProgress = async () => {
  const res = await ProjectModule.ActivityManager.getActivityProgress(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    activityProgress.value = res.data.sum ?? 0;
    return
  }
  toast.error("Error al cargar el progreso de la actividad")
}

const getAssignments = async () => {
  const res = await ProjectModule.AssignmentManager.getActivityAssignments(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    assignments.value = res.assignments;
    return
  }
  toast.error("Error al cargar las asignaciones de la actividad")
}

const members = ref<Member[]>([])
const getMembers = async () => {
  const res = await ProjectModule.MemberManager.getProjectMembers(
    parseInt(projectId.value.toString())
  );
  if (res.success) {
    members.value = res.members;
    return
  }
  toast.error("Error al cargar los miembros del proyecto")
}
const possibleAssignments = computed(() => {
  return members.value.filter(member => !assignments.value.some(assignment => assignment.member_id === member.id))
})

const precedingActivities = ref<Activity[]>([])
const getPrecedingActivities = async () => {
  const res = await ProjectModule.ActivityManager.getPrecedingActivity(
    parseInt(activityId.value.toString())
  );
  console.log(res);
  if (res.success) {
    precedingActivities.value = res.data;
    return
  }
  toast.error("Error al cargar las prelaciones")
}

const activities = ref<Activity[]>([])
const getActivities = async () => {
  const res = await ProjectModule.ActivityManager.getActivitiesFromProject(
    parseInt(projectId.value.toString())
  );
  if (res.success) {
    activities.value = res.data;
    return
  }
  toast.error("Error al cargar las actividades del proyecto")
}
const possiblePrecedences = computed(() => {
  return activities.value.filter(activity => !precedingActivities.value.some(precedence => 
    precedence.activity_id === activity.activity_id
    || activity.activity_id === parseInt(activityId.value.toString())

  ))
})

const loadData = async () => {
  await getActivity()
  await getProgress()
  await getAssignments()
  await getMembers()
  await getPrecedingActivities()
  await getActivities()
}
loadData()

watch(route, () => {
  console.log("route changed")
  loadData()
})
watch(activity, () => {
  console.log("activity changed")
  console.log(activity.value)
})

const isDeadlinePassed = computed(() => {
  if (!activity.value) return false
  return new Date(activity.value.deadline) < new Date()
})

</script>


<template>
  <div class="flex flex-col gap-4" v-if="activity">
    <h1 class="text-5xl">
      Actividad:
      <span class="font-bold">
        {{ activity.activity_name }}
      </span>

    </h1>
    <div class="flex gap-4">
      <Badge class="text-base p-2">
        <Clock :size="16" class="mr-2" />
        {{ activity.estimated_hours }} horas
      </Badge class="text-base p-2">
      <Badge :variant="isDeadlinePassed ? 'destructive' : 'outline'">
        <Calendar :size="16" class="mr-2" />
        <span class="text-base">
          {{ new Date(activity.deadline).toLocaleDateString("es-ES",
            { day: 'numeric', month: "short" }
          ) }}
        </span>
      </Badge>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Progreso:
        {{ activityProgress }}%
      </h2>
      <Progress v-model="activityProgress" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Miembros:</h2>
      <div class="flex gap-2">
        <MemberDropdown v-for="assignment in assignments" :key="assignment.id" :assignment="assignment"
          @refetch="getAssignments()" />
        <AddAssignmentDialog :projectId="parseInt(projectId.toString())" :members="possibleAssignments"
          @refetch="getAssignments()" :activityId="parseInt(activityId.toString())" />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Prelaciones:</h2>
      <div class="flex  gap-2">
        <PrecedenceDropdown v-for="precedence in precedingActivities" :key="precedence.activity_id"
          :precedence="precedence" :projectId="Number(projectId)" :activityId="Number(activityId)"
          @refetch="getPrecedingActivities()" />
        <AddPrecedenceDialog :projectId="parseInt(projectId.toString())" :activities="possiblePrecedences"
          @refetch="getPrecedingActivities()" :activityId="parseInt(activityId.toString())" />
      </div>
    </div>

  </div>
</template>