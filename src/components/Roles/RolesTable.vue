<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {
  ColumnDef,
  ColumnFiltersState,
} from '@tanstack/vue-table'
import type {  Person, Profile } from "@/lib/CustomTypes";
import { h, ref, watch } from 'vue'
import { valueUpdater } from '@/lib/utils'
import DeleteRoleDialog from "./DeleteRoleDialog.vue";
import { currentUserStore } from "@/stores/currentUserStore";




const emit = defineEmits(["refetch"])
const defaultRoles = [4, 5, 6] as number[]
const columns: ColumnDef<Profile>[] = [

  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Nombre del perfil",
  }, 
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const profile = row.original
      return defaultRoles.includes(profile.id) || currentUserStore.role === profile.description ? "" : 
      h(DeleteRoleDialog, {
        roleId: profile.id,
        onRefetch: () => emit('refetch')
      })
    },
  }

];

const props = defineProps<{
  data: Profile[]
}>()

const table = useVueTable({
  get data() { return props.data },
  columns: columns,
  getCoreRowModel: getCoreRowModel(),

})



</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="border rounded-md relative">
      <Table class="">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Sin personas disponibles
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

  </div>
</template>