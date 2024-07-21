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
import AvatarDropdown from '@/components/Navbar/AvatarDropdown.vue';

const router = useRouter()


</script>

<template>
  <div class="h-14 flex items-center justify-end p-2 bg-white">
    <AvatarDropdown />
  </div>
</template>