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



const props = defineProps<{
  updateId: number
}>()
const emit = defineEmits(['refetch'])

const deleteAssignment = async () => {
  const ProjectModule = moduleCaller<ProjectModuleType>(
    apiRoutes.toProcess,
    "ProjectModule"
  );

  const res = await ProjectModule.ProgressManager.deleteUpdate(props.updateId);
  if (res.success) {
    toast.success("Avance eliminado correctamente");
    emit('refetch');
  } else {
    toast.error("Error al eliminar el avance");
  }


}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive">
        <Trash class="w-4 h-4 mr-2" />
        Eliminar avance
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar el avance?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
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