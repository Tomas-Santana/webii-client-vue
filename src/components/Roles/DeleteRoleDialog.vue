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
import { type OptionModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import { projectsStore } from '@/stores/projectsStore';

const props = defineProps<{
  roleId: number
}>()
const emit = defineEmits(['refetch'])

const deleteProfile = async () => {
  const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, "OptionModule");

  const response = await OptionModule.OptionManager.deleteProfile(props.roleId);

  if (response.success) {
    toast.success('Rol eliminado correctamente');
    emit('refetch');
  } else {
    toast.error('Error al eliminar el rol');
  }


}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        size="sm"
        variant="ghost"
      >
        <Trash />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar el rol?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="() => {
          deleteProfile();
        }" class="bg-red-500 text-white">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>