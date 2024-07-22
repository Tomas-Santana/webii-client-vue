<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import type { Member, Person, Activity } from "@/lib/CustomTypes";
import { computed, h, ref, watch } from 'vue'
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller";
import { type ProjectModuleType } from "@/lib/ModuleTypes";
import apiRoutes from "@/apiRoutes";
import { toast } from 'vue-sonner';
import { valueUpdater } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { useRoute } from "vue-router";



const emit = defineEmits(["refetch"])
const props = defineProps<{
  data: Activity[]
  activityId: number|null
}>()
const columns: ColumnDef<Activity>[] = [
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
    accessorKey: "activity_name",
    header: "Nombre",
  },
  {
    accessorKey: "deadline",
    accessorFn: (activity) => new Date(activity.deadline).toLocaleDateString(),
    header: "Fecha límite",
  },
  {
    accessorKey: "estimated_hours",
    
    header: "Horas estimadas",
    id: "estimated_hours",
  }

];



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
 

const createPrecedence = async () => {
  if (!props.activityId) {
    toast.error('No se ha creado la actividad')
    return
  }
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, 'ProjectModule')
  for (const [key, _] of Object.entries(rowSelection.value)) {
    const activity = props.data[Number(key)]

    const response = await ProjectModule.ActivityManager.createPrecedence(activity.activity_id, props.activityId)
    if (!response.success) {
      toast.error('Error al crear la precedencia')
      return
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
      <Button @click="createPrecedence" :variant="Object.entries(rowSelection).length > 0 ? 'default': 'secondary'">
        {{
          Object.entries(rowSelection).length > 0 ? "Agregar prelaciones" : "Saltar"
        }}
      </Button>
    </div>
  </div>
</template>