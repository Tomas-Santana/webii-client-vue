<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Plus } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import AddActivityForm from '@/components/Actividades/AddActivityForm.vue';
import SelectActivityTable from './SelectActivityTable.vue';
import type { Activity, Member, ProjectTreeEntry } from '@/lib/CustomTypes'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import SelectAssigmentsTable from './SelectAssigmentsTable.vue';

const props = defineProps<{
  objectiveId: number,
  objectiveName: string
  projectId: number,
  projectTree: ProjectTreeEntry[]
  members: Member[]
}>()

const activities = computed<Activity[]>(() => {
  return props.projectTree.map(entry => {
    const { objective_id, objective_name, ...activity } = entry
    return activity
  }).filter(activity => activity.activity_id !== activityId.value)

})



const emit = defineEmits(["refetch"])
const open = ref(false)
const currentTab = ref<'activity' | 'precendences' | 'assignments'>('activity')
const activityId = ref<number | null>(null)

watch(open, (newVal) => {
  if (!newVal) {
    emit("refetch")
  }

})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Plus />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          {{ objectiveName }}: Agregar actividad
        </DialogTitle>
        <DialogDescription>
          Llena el formulario para agregar una nueva actividad
        </DialogDescription>
      </DialogHeader>
      <Tabs class="w-full" v-model:model-value="currentTab">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="activity" >Agregar actividad</TabsTrigger>
          <TabsTrigger value="precendences" >Seleccionar actividades</TabsTrigger>
          <TabsTrigger value="assignments" >Asignar miembros</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" class="flex flex-col gap-4">
          <DialogTitle>Agregar actividad</DialogTitle>
          <AddActivityForm :objectiveId="props.objectiveId" :projectId="props.projectId"
            @refetch=" emit('refetch')"
            @insert="activityId = $event; currentTab = 'precendences'"
            />
        </TabsContent>
        <TabsContent value="precendences" class="flex flex-col gap-4">
          <DialogTitle>Seleccionar prelaciones</DialogTitle>
          <SelectActivityTable :data="activities" :activity-id="activityId"  @refetch="currentTab='assignments'" />
        </TabsContent>
        <TabsContent value="assignments" class="flex flex-col gap-4">
          <DialogTitle>Asignar miembros</DialogTitle>
          <SelectAssigmentsTable :data="props.members" :activityId="activityId"
            @refetch="open=false; currentTab='activity'"
          />
        </TabsContent>

      </Tabs>
    </DialogContent>
  </Dialog>
</template>
