<script setup lang="ts">
import {
  LogOut,
  Trash
} from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { Avatar, AvatarFallback } from '../ui/avatar';
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
import type { Assignment } from '@/lib/CustomTypes';

const props = defineProps<{
  assignment: Assignment
}>()
const emit = defineEmits(["refetch"])


const initials = computed(() => {
  return props.assignment.first_name[0] + props.assignment.last_name[0]
})


</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <div 
        :title="props.assignment.first_name + ' ' + props.assignment.last_name"
        class=" "
      >

        <Button variant="ghost" class="aspect-square rounded-full p-0"
        
        >
          <Avatar size="sm" class="border" 
  
          >
            <AvatarFallback>
              {{ initials }}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-64">
      <DropdownMenuLabel class="flex justify-between items-center">
        <span>
          {{ props.assignment.first_name }} {{ props.assignment.last_name }}
        </span>
        <span class="text-xs text-gray-400">
          {{ props.assignment.cedula }}
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DeleteMemberDialog :assignmentId="props.assignment.id"
        @refetch="emit('refetch')"
      >
        <Button class="text-red-500 w-full justify-start p-2" variant="ghost">
          <Trash class="w-4 h-4 mr-2" />
          Eliminar miembro
        </Button>
      </DeleteMemberDialog>
    </DropdownMenuContent>
  </DropdownMenu>
</template>