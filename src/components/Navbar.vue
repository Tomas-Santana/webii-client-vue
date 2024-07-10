<script setup lang="ts">
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import apiRoutes from '@/apiRoutes';
import { useRouter } from 'vue-router';

const router = useRouter()
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
  <div class="h-14 flex items-center justify-end p-2 bg-white">
    <Button
      @click="handleLogout"
      variant="destructive"
    >
      Cerrar sesión
  </Button>
  </div>
</template>