<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-vue-next'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { projectsStore } from '@/stores/projectsStore';

const props = defineProps<{
  precedingId: number,
  subsequentId: number
}>()
const emit = defineEmits(['refetch'])

const deletePrecedence = async () => {
  const ProjectModule = moduleCaller<ProjectModuleType>(
    apiRoutes.toProcess,
    "ProjectModule"
  );

  const res = await ProjectModule.ActivityManager.deletePrecedence(
    props.precedingId,
    props.subsequentId
  );

  if (res.success) {
    toast.success("Prelacion eliminada exitosamente");
    emit('refetch');
    return
  }
  toast.error("Error al eliminar la prelacion");


}

</script>

<template>
  <AlertDialog >
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar la prelacion?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="() => {
          deletePrecedence();
        }" class="bg-red-500 text-white">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>