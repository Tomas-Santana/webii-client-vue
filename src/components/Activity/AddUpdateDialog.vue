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
import AddUpdateForm from './AddUpdateForm.vue';
const props = defineProps<{
  assignmentId: number
  currentProgress: number
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
      <Button class="rounded-full" variant="outline">
        <Plus class="w-4 h-4 mr-2" />
        Agregar avance
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          Agregar avance
        </DialogTitle>
        <DialogDescription>
          Llena el formulario para agregar un avance a la actividad
        </DialogDescription>
      </DialogHeader>
      <AddUpdateForm 
        @refetch="open = false; emit('refetch')"
        :currentProgress="props.currentProgress"
        :assignmentId="props.assignmentId"
      />


    </DialogContent>
  </Dialog>
</template>
