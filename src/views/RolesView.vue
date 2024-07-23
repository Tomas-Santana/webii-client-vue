<script setup lang="ts">
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller'
import type { OptionModuleType, UserModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, 'OptionModule');
const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess, 'UserModule');
import { optionsToTree } from '@/lib/optionsToTree';
import type { Menu, Profile, User } from '@/lib/CustomTypes';
import { ref } from 'vue';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import RolesTable from '@/components/Roles/RolesTable.vue';
import OptionsVisualizer from '@/components/Roles/OptionsVisualizer.vue';
import OptionsSelector from '@/components/Roles/OptionsSelector.vue';
import CreateRoleForm from '@/components/Roles/CreateRoleForm.vue';
import UserTable from '@/components/Roles/UserTable.vue';
import { allMenusStore } from '@/stores/allMenusStore';



const options = ref<Menu[]>([]);
const getAllOptions = async () => {
  const res = await OptionModule.OptionManager.getAllOptions();
  if (res.success)
    allMenusStore.allMenus = optionsToTree(res.data);
}
getAllOptions();

const profiles = ref<Profile[]>([]);
const getProfiles = async () => {
  const res = await OptionModule.OptionManager.getSystemProfiles();
  if (res.success)
    profiles.value = res.data;
}
getProfiles();


const users = ref<User[]>([]);
const getUsers = async () => {
  const res = await UserModule.UserManager.getUserList();
  console.log(res);
  if (res.success)
    users.value = res.data;
}
getUsers();

</script>
<template>
  <div class="flex flex-col gap-4 max-w-3xl">
    <h1 class="text-5xl font-bold">
      Administrar Roles
    </h1>
    <Tabs
      default-value="roles"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="roles">
          Roles
        </TabsTrigger>
        <TabsTrigger value="users">
          Usuarios
        </TabsTrigger>
      </TabsList>
      <TabsContent value="roles">
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl">
            Roles del sistema
          </h2>
          <RolesTable :data="profiles" @refetch="getProfiles" />
        </div>
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl">
            Crear nuevo rol
          </h2>
          <div class="p-4 rounded-md border bg-white">

            <CreateRoleForm :menu="allMenusStore.allMenus" @refetch="getProfiles" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="users">
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl">
            Usuarios
          </h2>
          <UserTable :data="users"
            :roles="profiles"
          />
        </div>
      </TabsContent>
    </Tabs>





  </div>
</template>
