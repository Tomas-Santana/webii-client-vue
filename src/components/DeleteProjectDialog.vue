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
import {type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { projectsStore } from '@/stores/projectsStore';

const props = defineProps<{
  projectId: number
}>()
const emit = defineEmits(['refetch'])

const deleteProject = async () => {
  const ProjectModule = moduleCaller<ProjectModuleType>(
    apiRoutes.toProcess,
    "ProjectModule"
  );
  
  const res = await ProjectModule.ProjectManager.deleteProject(props.projectId);
  if (res.success) {
    toast.success("Project deleted successfully");
    projectsStore.projects = projectsStore.projects.filter((project) => project.id !== props.projectId);
  } else {
    toast.error("Error deleting project");
  }

}





</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">
        <Trash class="text-red-500"/>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar el proyecto?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          @click="() => {
            deleteProject();
            emit('refetch');
          }"
          class="bg-red-500 text-white"
        >Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>