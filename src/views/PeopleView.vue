<script setup lang="ts" >
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { UserModuleType, OptionModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import type { Person } from '@/lib/CustomTypes';
import { ref } from 'vue';
import {toast} from 'vue-sonner'
import ComplexPeopleTable from '@/components/People/ComplexPeopleTable.vue';
import CreatePersonForm from '@/components/People/CreatePersonForm.vue';
import type { ViewOptions } from '@/lib/MenuOptions';

const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess, 'UserModule');
const people = ref<Person[]>([]);
const getPeople = async () => {
  const res = await UserModule.PeopleManager.getPeople();
  if (res.success) {
    people.value = res.people;
    return
  }
  toast.error("Error obteniendo personas")
};
getPeople();

const options = ref<ViewOptions["Sidebar"][]>([]);
const getOptions = async () => {
  const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, 'OptionModule');
  const res = await OptionModule.OptionManager.getMenuOptions("Sidebar");
  if (!res.success) {
    toast.error(res.message);
  }
  options.value = res.data as ViewOptions["Sidebar"][];
}
getOptions();




</script>

<template>
  <div class="flex flex-col gap-4 max-w-3xl"
    v-if="options.includes('AdminPeople')"
  >
    <h1 class="text-5xl font-bold">
      Administrar personas
    </h1>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">
        Registrar persona
      </h2>
      <div class="p-4 rounded full border bg-white">

        <CreatePersonForm @refetch="getPeople" />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">
        Personas registradas
      </h2>
      <ComplexPeopleTable :data="people" @refetch="getPeople" :canDelete="false" />
    </div>

  </div>

</template>
  

