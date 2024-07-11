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
import apiRoutes from '@/apiRoutes';
import PeopleTable from '../PeopleTable/PeopleTable.vue';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { UserModuleType } from '@/lib/ModuleTypes';
import { ref, watch } from 'vue';
import type { Person } from '@/lib/CustomTypes';

const people = ref<Person[]>([])
const getPeople = async () => {
  const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess, "UserModule");
  const response = await UserModule.PeopleManager.getPeople();
  console.log(response)
  if (response.success) {
    people.value = response.people
  }
}
getPeople()

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
        Nuevo Recurso
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar un nuevo miembro al proyecto</DialogTitle>
        <DialogDescription>
          Selecciona un miembro para agregar al proyecto
        </DialogDescription>
      </DialogHeader>
      <PeopleTable :data="people" @refetch="emit('refetch');open=false" />
    </DialogContent>
  </Dialog>
</template>
