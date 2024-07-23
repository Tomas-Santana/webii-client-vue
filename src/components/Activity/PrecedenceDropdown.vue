<script setup lang="ts">
import {
  LogOut,
  Trash,
  SquareArrowOutUpRightIcon
} from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { Avatar, AvatarFallback } from '../ui/avatar';
DeletePrecedenceDialog
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { computed } from 'vue';
import DeleteMemberDialog from './DeleteMemberDialog.vue';
import type { Assignment, Activity } from '@/lib/CustomTypes';
import { RouterLink } from 'vue-router';
import DeletePrecedenceDialog from './DeletePrecedenceDialog.vue';
import type { ActivityAndProgress } from '@/lib/CustomTypes';
import { Progress } from '@/components/ui/progress';

const props = defineProps<{
  precedence: ActivityAndProgress
  projectId: number,
  activityId: number
}>()
const emit = defineEmits(["refetch"])





</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="rounded-full flex flex-col" size="lg">
        {{ props.precedence.activity_name }}

      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-64">
      <RouterLink :to="`/${props.projectId}/actividad/${props.precedence.activity_id}`">
        <DropdownMenuItem class="">
          <SquareArrowOutUpRightIcon class="w-4 h-4 mr-2" />
          Ir a la actividad
        </DropdownMenuItem>
      </RouterLink>
      <DropdownMenuItem class="">
        Progreso:  
        <span class="font-bold"> {{ " " }} {{ props.precedence.progress ?? 0 }}%</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DeletePrecedenceDialog :precedingId="props.precedence.activity_id" :subsequentId="props.activityId"
        @refetch="emit('refetch')">
        <Button class="text-red-500 w-full justify-start p-2" variant="ghost">
          <Trash class="w-4 h-4 mr-2" />
          Eliminar prelacion
        </Button>
      </DeletePrecedenceDialog>

    </DropdownMenuContent>
  </DropdownMenu>
</template>