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
import EditObjectiveForm from './EditObjectiveForm.vue';
import type { ProjectTree } from '@/lib/CustomTypes';

const emit = defineEmits(["refetch"])
const props = defineProps<{
  objective: ProjectTree
}>()
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
        <Edit class="w-4 h-4 mr-2" />
        Editar objetivo
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Agregar un nuevo miembro al proyecto</DialogTitle>
        <DialogDescription>
          Selecciona un miembro para agregar al proyecto
        </DialogDescription>
      </DialogHeader>

      <EditObjectiveForm @refetch="open = false;emit('refetch')"
        :objective="props.objective"
      />
      


    </DialogContent>
  </Dialog>
</template>
