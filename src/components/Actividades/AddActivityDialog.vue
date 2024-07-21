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
import { Plus } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import AddActivityForm from '@/components/Actividades/AddActivityForm.vue';

defineProps<{
  objectiveId: number,
  objectiveName: string
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
      <Button variant="ghost">
        <Plus />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar una nueva actividad para el Objetivo 
          {{ objectiveName }}
        </DialogTitle>
        <DialogDescription>
          Llena el formulario para agregar una nueva actividad
        </DialogDescription>
      </DialogHeader>
      <AddActivityForm @refetch="open=false;emit('refetch')" 
        :objectiveId="objectiveId"
      />
    </DialogContent>
  </Dialog>
</template>
