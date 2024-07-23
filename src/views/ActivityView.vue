<script setup lang="ts">
import { useRoute } from 'vue-router';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import type { ViewOptions } from '@/lib/MenuOptions';
import { useProjectMenuOptions } from '@/lib/useMenuOptions';
import apiRoutes from '@/apiRoutes';
import { type Update, type Activity, type Assignment, type Member } from '@/lib/CustomTypes';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { Progress } from '@/components/ui/progress';
import MemberDropdown from '@/components/Activity/MemberDropdown.vue';
import PrecedenceDropdown from '@/components/Activity/PrecedenceDropdown.vue';
import { Plus, Clock, Calendar } from 'lucide-vue-next';
import { currentUserStore } from '@/stores/currentUserStore';
import { Badge } from '@/components/ui/badge';
import AddAssignmentDialog from '@/components/Activity/AddAssignmentDialog.vue';
import AddPrecedenceDialog from '@/components/Activity/AddPrecedenceDialog.vue';
import AddUpdateDialog from '@/components/Activity/AddUpdateDialog.vue';
import UpdateCard from '@/components/Activity/UpdateCard.vue';
import DeleteActivityDialog from '@/components/Activity/DeleteActivityDialog.vue';
import EditActivityDialog from '@/components/Activity/EditActivityDialog.vue';
import { Separator } from '@/components/ui/separator';

const route = useRoute()

const activityId = computed(() => route.params.activityId)
const projectId = computed(() => route.params.projectId)
const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const { options } = useProjectMenuOptions<ViewOptions["ActivityView"]>(
  "ActivityView",
  parseInt(projectId.value.toString()),
)
const activity = ref<Activity | null>(null)
const activityProgress = ref<number>(0)

const assignments = ref<Assignment[]>([])
const getActivity = async () => {
  const res = await ProjectModule.ActivityManager.getActivity(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    activity.value = res.data;
    console.log(activity.value)
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
const myAssignment = computed(() => {
  return assignments.value.find(assignment => assignment.person_id === currentUserStore.personId)
})
const amIAssigned = computed(() => {
  return myAssignment.value !== undefined
})

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

type ActivityAndProgress = Activity & {
  progress?: number
}
const precedingActivities = ref<ActivityAndProgress[]>([])
const getPrecedingActivities = async () => {
  const res = await ProjectModule.ActivityManager.getPrecedingActivity(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    precedingActivities.value = res.data;
    precedingActivities.value.forEach(async (activity) => {
      const progressRes = await ProjectModule.ActivityManager.getActivityProgress(activity.activity_id)
      if (progressRes.success) {
        activity.progress = progressRes.data.sum ?? 0
      }
    })
    return
  }
  toast.error("Error al cargar las prelaciones")
}
const missingPrecedences = computed(() => {
  return precedingActivities.value.filter(activity => activity.progress !== 100)
})
const arePrecedencesDone = computed(() => {
  return missingPrecedences.value.length === 0
})

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

  return activities.value.filter(activity => !precedingActivities.value.some(precedence => precedence.activity_id === activity.activity_id) && activity.activity_id !== Number(activityId.value))
})
const updates = ref<Update[]>([])
const getUpdates = async () => {
  const res = await ProjectModule.ProgressManager.getActivityUpdates(
    parseInt(activityId.value.toString())
  );
  if (res.success) {
    updates.value = res.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    console.log(updates.value)
    return
  }
  toast.error("Error al cargar los avances de la actividad")
}
const workedHours = computed(() => {
  return updates.value.reduce((acc, update) => acc + update.worked_hours, 0)
})
// calculate if estimated hours are right (percentage matches how much time has been worked)
const isEstimationRight = computed(() => {
  const workedHoursAsPercentage = (workedHours.value / (activity.value?.estimated_hours ?? 1)) * 100
  console.log(activityProgress.value - workedHoursAsPercentage)
  return workedHoursAsPercentage - activityProgress.value < 5
})

const loadData = async () => {
  await getActivity()
  await getProgress()
  await getAssignments()
  await getMembers()
  await getPrecedingActivities()
  await getActivities()
  await getUpdates()
}
loadData()

watch(route, () => {
  console.log("route changed")
  loadData()

})


const isDeadlinePassed = computed(() => {
  if (!activity.value) return false
  return new Date(activity.value.deadline) < new Date()
})

</script>


<template>
  <div class="flex flex-col gap-4 items-start" v-if="activity">
    <h1 class="text-5xl">
      Actividad:
      <span class="font-bold">
        {{ activity.activity_name }}
      </span>

    </h1>
    <div class="flex gap-4 flex-wrap">
      <Badge class="text-base p-2">
        <Clock :size="16" class="mr-2" />
        Estimado:
        {{ activity.estimated_hours }} horas
      </Badge class="text-base p-2">
      <Badge class="text-base p-2">
        <Clock :size="16" class="mr-2" />
        Trabajado:
        {{ workedHours }} horas
      </Badge class="text-base p-2">
      <Badge :variant="isDeadlinePassed ? 'destructive' : 'outline'">
        <Calendar :size="16" class="mr-2" />
        <span class="text-base">
          Fecha límite:
          {{ new Date(activity.deadline).toLocaleDateString("es-ES",
          { day: 'numeric', month: "short" }
          ) }}
        </span>
      </Badge>
    </div>
    <div class="flex flex-col gap-2 items-start">
      <h2 :class="amIAssigned ? 'text-green-500' : 'text-secondary-foreground'">
        {{ amIAssigned ? "Has sido asignado a esta actividad" : "No has sido asignado a esta actividad" }}
      </h2>
      <p>
        <span :class="arePrecedencesDone ? 'text-green-500' : 'text-red-500'">

          {{ arePrecedencesDone ? "Todas las prelaciones han sido completadas" : "Faltan prelaciones por completar: "
          }}
        </span>
        {{
        missingPrecedences.map(precedence => precedence.activity_name).join(", ")
        }}
      </p>

      <AddUpdateDialog :currentProgress="activityProgress" @refetch="getProgress();getUpdates()"
        :assignment-id="myAssignment.id" v-if="amIAssigned && arePrecedencesDone && myAssignment" />
    </div>
    <Separator />

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Progreso:
        {{ activityProgress }}%
      </h2>
      <Progress v-model="activityProgress" />

      <p>
        <span v-if="isEstimationRight" class="text-green-500">
          La estimación de horas coincide con el progreso
        </span>
        <span v-else class="text-red-500">
          La estimación de horas no coincide con el progreso
        </span>
      </p>
    </div>
    <Separator />

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Miembros:</h2>
      <div class="flex gap-2 flex-wrap">
        <MemberDropdown v-for="assignment in assignments" :key="assignment.id" :assignment="assignment" 
          @refetch="getAssignments();getProgress();getUpdates()" />
        <AddAssignmentDialog :projectId="parseInt(projectId.toString())" :members="possibleAssignments"
          @refetch="getAssignments()" :activityId="parseInt(activityId.toString())"
          v-if="options?.includes('Assign')"
          />
      </div>
    </div>
    <Separator />

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Prelaciones:</h2>
      <div class="flex gap-2 flex-wrap">
        <PrecedenceDropdown v-for="precedence in precedingActivities" :key="precedence.activity_id"
          :precedence="precedence" :projectId="Number(projectId)" :activityId="Number(activityId)"
          @refetch="getPrecedingActivities()" />
        <AddPrecedenceDialog :projectId="parseInt(projectId.toString())" :activities="possiblePrecedences"
          @refetch="getPrecedingActivities()" :activityId="parseInt(activityId.toString())"
          v-if="options?.includes('CreatePrecedence')"
          />
      </div>
    </div>
    <Separator />

    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Ultimos avances</h2>
      <div class="flex gap-2 flex-wrap">
        <UpdateCard v-for="update in updates" :key="update.id" :update="update" :myAssignmentId="myAssignment?.id"
          @refetch="getUpdates();getProgress()" />
        <!-- if no updates -->

        <div v-if="updates.length === 0" class="flex flex-col gap-2">
          <p>No hay avances registrados</p>

        </div>

      </div>
    </div>
    <Separator />
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Acciones</h2>
      <div class="flex gap-2">
        <DeleteActivityDialog :activityId="parseInt(activityId.toString())"
          v-if="options?.includes('DeleteActivity')"
        />
        <EditActivityDialog :currentActivity="activity" @refetch="getActivity()" 
          v-if="options?.includes('EditActivity')"
        />
      </div>
    </div>
  </div>
</template>