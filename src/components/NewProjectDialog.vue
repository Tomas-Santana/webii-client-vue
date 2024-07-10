<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import NewProjectForm from './NewProjectForm.vue'
import { ref, watch } from 'vue';

const emit = defineEmits(["refetch"])

const open = ref(false)

watch(open, (newVal) => {
  if (!newVal) {
    emit("refetch")
  }
    
})
</script>

<template>
  <Dialog 
    v-model:open="open"
  >
    <DialogTrigger as-child>
      <Button variant="outline">
        Crear projecto
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Crear nuevo projecto</DialogTitle>
        <DialogDescription>
          Llena el formulario para crear un nuevo projecto
        </DialogDescription>
      </DialogHeader>
      <NewProjectForm @close="open=false" />
    </DialogContent>
  </Dialog>
</template>