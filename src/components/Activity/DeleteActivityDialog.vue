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
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { Button } from '../ui/button';
import { Trash } from 'lucide-vue-next';

const router = useRouter();

const props = defineProps<{
  activityId: number
}>()

const deleteActivity = async () => {
  const ProjectModule = moduleCaller<ProjectModuleType>(
    apiRoutes.toProcess,
    "ProjectModule"
  );

  const res = await ProjectModule.ActivityManager.deleteActivity(props.activityId);
  if (res.success) {
    toast.success("Actividad eliminada correctamente");
    // go back
    router.go(-1);
    
  } else {
    toast.error("Error al eliminar la actividad");
  }

}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive">
        <Trash 
          class="w-4 h-4 mr-2"
        />
        Eliminar actividad
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar la actividad?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="() => {
          deleteActivity();
        }" class="bg-red-500 text-white">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>