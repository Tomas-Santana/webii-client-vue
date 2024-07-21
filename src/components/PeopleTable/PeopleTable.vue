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
import type { Member, Person } from "@/lib/CustomTypes";
import { h, ref, watch } from 'vue'
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller";
import { type ProjectModuleType } from "@/lib/ModuleTypes";
import apiRoutes from "@/apiRoutes";
import { toast } from 'vue-sonner';
import { valueUpdater } from '@/lib/utils'
import Button from "../ui/button/Button.vue";
import Checkbox from "../ui/checkbox/Checkbox.vue";
import { useRoute } from "vue-router";



const route = useRoute()
const open = ref(false)
const emit = defineEmits(["refetch"])

const columns: ColumnDef<Person>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
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
  }

];

const props = defineProps<{
  data: Person[]
  roleId: number
}>()

const columnFilters = ref<ColumnFiltersState>([])
const rowSelection = ref({})
const table = useVueTable({
  get data() { return props.data },
  columns: columns,
  getCoreRowModel: getCoreRowModel(),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection), 
  state: {
    get columnFilters() { return columnFilters.value },
    get rowSelection() { return rowSelection.value },
  },
})



const addMembers = async () => {
  if (!props.roleId ) {
    toast.error("No se ha seleccionado ningún rol")
    return
  }
  if (Object.keys(rowSelection.value).length === 0) {
    toast.error("No se ha seleccionado ningún miembro")
    return
  }
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
  for (const [key, _] of Object.entries(rowSelection.value)) {
    const person = props.data[Number(key)]
    const response = await ProjectModule.MemberManager.insertMember(Number(route.params.id), person.cedula, props.roleId)
    if (response.success) {
      toast.success(`Miembro ${person.first_name + " " + person.last_name} agregado exitosamente`)
    } else {
      toast.error(`Error al agregar miembro ${person.first_name + " " + person.last_name}. ${response.message ?? ""}`)
    }
  }
  emit("refetch")
}


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
      <Button
        @click="addMembers"
      >
        Agregar miembros
      </Button>
    </div>
  </div>
</template>