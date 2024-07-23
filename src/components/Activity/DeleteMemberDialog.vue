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
  assignmentId: number
}>()
const emit = defineEmits(['refetch'])

const deleteAssignment = async () => {
  const ProjectModule = moduleCaller<ProjectModuleType>(
    apiRoutes.toProcess,
    "ProjectModule"
  );

  const res = await ProjectModule.AssignmentManager.deleteAssignment(props.assignmentId);
  if (res.success) {
    toast.success("Miembro eliminado correctamente");
    projectsStore.projects = projectsStore.projects.filter((project) => project.id !== props.assignmentId);
    emit('refetch');
  } else {
    toast.error("Error al eliminar el miembro");
  }


}

</script>

<template>
  <AlertDialog
 
  >
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar la asignación?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Eliminará todos los avances de este miembro.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="() => {
          deleteAssignment();
          emit('refetch');
        }" class="bg-red-500 text-white">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>