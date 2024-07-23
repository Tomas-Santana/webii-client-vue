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
import { type UserModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';
import type { Person } from '@/lib/CustomTypes';



const props = defineProps<{
  person: Person
}>()
const emit = defineEmits(['refetch'])

const deletePerson = async () => {
  const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess,'UserModule');
  const response = await UserModule.PeopleManager.deletePersonWithCedula(props.person.cedula);
  if (response.success) {
    toast.success('Persona eliminada correctamente');
  } else {
    toast.error('Error al eliminar la persona');
  }

}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="ghost" class="w-full text-red-500">
        <Trash class="w-4 h-4 mr-2" />
        Eliminar persona
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro que quieres eliminar a
          {{ props.person.first_name }} {{ props.person.last_name }}
          ?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="() => {
          deletePerson();
          emit('refetch');
        }" class="bg-red-500 text-white">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>