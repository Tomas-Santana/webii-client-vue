<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import DeletePersonDialog from './DeletePersonDialog.vue';
import type { Person } from '@/lib/CustomTypes';

defineProps<{
  person: Person
}>()
const emit = defineEmits(['refetch'])


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
       <DeletePersonDialog
        @refetch="emit('refetch')"
        :person="person"
       />
    </DropdownMenuContent>
  </DropdownMenu>
</template>