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
import {  ref, watch } from 'vue';
import AddObjectiveForm from '@/components/Actividades/AddObjectiveForm.vue';


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
      <Button variant="outline">
        <Plus class="w-4 h-4 mr-2" />
        Nuevo Objetivo
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Agregar un nuevo miembro al proyecto</DialogTitle>
        <DialogDescription>
          Selecciona un miembro para agregar al proyecto
        </DialogDescription>
      </DialogHeader>
      <AddObjectiveForm @refetch="open=false;emit('refetch')"/>
      

    </DialogContent>
  </Dialog>
</template>
