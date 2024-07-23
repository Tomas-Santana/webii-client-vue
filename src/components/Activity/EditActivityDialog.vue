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

import { Plus, Edit } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import EditActivityForm from './EditActivityForm.vue';
import type { Activity } from '@/lib/CustomTypes';
const props = defineProps<{
  currentActivity: Activity
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
      <Button class="" variant="outline">
        <Edit class="w-4 h-4 mr-2" />
        Editar actividad
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
      <EditActivityForm 
        :current-activity="props.currentActivity"
        @refetch="open = false"
      />


    </DialogContent>
  </Dialog>
</template>
