<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import AssignRoleDialog from './AssignRoleDialog.vue';
import type { User, Profile } from '@/lib/CustomTypes';
import type { OptionModuleType } from '@/lib/ModuleTypes';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import apiRoutes from '@/apiRoutes';
import { computed, ref } from 'vue';
import {toast} from 'vue-sonner'

const props = defineProps<{
  user: User,
  allRoles: Profile[]
}>()
const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, 'OptionModule');

const userRoles = ref<Profile[]>([])

const getRoles = async (userId: number) => {
  const res = await OptionModule.OptionManager.getProfilesFromUser(userId)
  if (res.success) {
    userRoles.value = res.data
  }
  else {
    toast.error("Error al obtener roles del usuario")
  }
}
getRoles(props.user.id)


const emit = defineEmits(['refetch'])


const allowedRoles = computed(() => {
  // allRoles - userRoles
  return props.allRoles.filter(role => !userRoles.value.some(userRole => userRole.id === role.id))
})






</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <AssignRoleDialog 
        :userId="props.user.id"
        :allowedRoles="allowedRoles"
      />
    </DropdownMenuContent>
  </DropdownMenu>
</template>