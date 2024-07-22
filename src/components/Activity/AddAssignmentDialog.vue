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
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';

import { Plus } from 'lucide-vue-next';
import {  ref, watch } from 'vue';
import type {  Member,  } from '@/lib/CustomTypes'
import SelectAssigmentsTable from '@/components/Actividades/SelectAssigmentsTable.vue';

const props = defineProps<{

  projectId: number,
  members: Member[],
  activityId: number,
}>()





const emit = defineEmits(["refetch"])
const open = ref(false)

watch(open, (newVal) => {
  if (!newVal) {
    emit("refetch")
  }

})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button class="aspect-square rounded-full p-2" variant="outline">
        <Plus class="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          Asignar actividad
        </DialogTitle>
        <DialogDescription>
          Selecciona los miembros que deseas asignar a esta actividad
        </DialogDescription>
      </DialogHeader>

      <SelectAssigmentsTable :data="props.members" :activityId="props.activityId" @refetch="open = false" />

    </DialogContent>
  </Dialog>
</template>
