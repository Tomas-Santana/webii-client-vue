<script setup lang="ts">
import {
  LogOut,
  User,
  ArrowLeftRight
} from 'lucide-vue-next'
import { RouterLink, useRouter } from 'vue-router';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { currentUserStore } from '@/stores/currentUserStore';

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed } from 'vue';


import apiRoutes from '@/apiRoutes';
import { toast } from 'vue-sonner';

const router = useRouter()
const initials = computed(() => {
  return currentUserStore.first_name?.charAt(0) + currentUserStore.last_name?.charAt(0)
})

const handleLogout = async () => {
  const response = await fetch(apiRoutes.logout, {
    method: 'GET',
    credentials: 'include'
  })
  if (response.ok) {
    router.push('/login')
  } else {
    toast.error('Error al cerrar sesión')
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="aspect-square rounded-full">
        <Avatar size="sm">
          <AvatarFallback>
            {{ initials ?? "CU" }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-64">
      <DropdownMenuLabel class="flex justify-between items-center">
        <span>
          {{ currentUserStore.first_name }} {{ currentUserStore.last_name }}
        </span>
        <span class="text-xs text-gray-400">
          {{ currentUserStore.role }}
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <RouterLink to="select-profile">
        <DropdownMenuItem>
            <ArrowLeftRight class="mr-2 h-4 w-4" />
            <span>Cambiar perfil</span>
          </DropdownMenuItem>
        </RouterLink>

      </DropdownMenuGroup>

      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout()">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>