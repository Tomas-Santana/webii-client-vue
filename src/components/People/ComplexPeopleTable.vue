<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
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
} from '@tanstack/vue-table'
import type { Member, Person } from "@/lib/CustomTypes";
import { h, ref, watch} from 'vue'
import { useRoute } from "vue-router";
import PeopleTableDropdown from "./PeopleTableDropdown.vue";



const route = useRoute()
const open = ref(false)
const emit = defineEmits(["refetch"])

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "first_name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
    id: "cedula",
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const person = row.original
      return h('div', { class: 'relative' }, h(PeopleTableDropdown, {
        person,
        onRefetch: () => emit('refetch')
      }))
    },
  },

];

const props = defineProps<{
  data: Person[]
  canDelete?: boolean
}>()

const table = useVueTable({
  get data() { return props.data },
  columns: columns,
  getCoreRowModel: getCoreRowModel(),

})

watch(() => props.canDelete, (value) => {
  table.setColumnVisibility({
    actions: value
  })
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
    <div>
    </div>
  </div>
</template>