<script setup lang="ts" >
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type UserModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { currentUserStore } from '@/stores/currentUserStore';
import { ref } from 'vue';
import type { Role } from '@/lib/CustomTypes';
import { RouterLink, useRouter } from 'vue-router';
import AdminProfile from '@/assets/profile-pics/admin.png'
import ProjectManagerProfile from '@/assets/profile-pics/project-manager.png'
import UserProfile from '@/assets/profile-pics/user.png'
import { toast } from 'vue-sonner';

const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess, 'UserModule');
const roles = ref<Role[]>([]);
const router = useRouter();

const getRoles = async () => {
  const response = await UserModule.UserManager.getRoles();
  if (response.success) {
    roles.value = response.data;
  }
  console.log(response);
}
getRoles();

const switchRoles = async (role: Role) => {
  const response = await UserModule.UserManager.switchRoles(role.id);
  if (response.success) {
    router.push('/proyecto');
    currentUserStore.role = role.description;
    return 
  }
  toast.error(response.message);
  

}

const rolesAndImages = {
  4: UserProfile,
  5: ProjectManagerProfile,
  6: AdminProfile,
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 h-dvh">
    <h1 class="text-5xl font-bold">
      Bienvenido, {{ currentUserStore.first_name }}
    </h1>
    <p class="text-xl">
      Selecciona un perfil para continuar
    </p>
    <div class="flex gap-8">
      <button v-for="role in roles" :key="role.id" class="rounded-md flex flex-col gap-2 items-center hover:scale-95 transition-transform"
        @click="switchRoles(role)"
      >
        <img :src="rolesAndImages[role.id]" alt="role.name" class="rounded-sm w-40 shadow-lg" />
        <p class="text-xl">{{ role.description }}</p>
      </button>
    </div>
  </div>
</template>