<script setup lang="ts" generic="TData, TValue" >
import { type ColumnDef } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { computed, type ComputedRef } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';
import type { Member } from "@/lib/CustomTypes";
import { h, ref, watch } from 'vue'
import { Trash } from "lucide-vue-next";
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller";
import { type ProjectModuleType } from "@/lib/ModuleTypes";
import apiRoutes from "@/apiRoutes";
import { toast } from 'vue-sonner';
import { currentUserStore } from '@/stores/currentUserStore';

const props = defineProps<{
  data: Member[]
  projectId: number
  allowDelete: boolean
}>()
console.log(props.allowDelete)

const deleteMember = async (projectId: number | undefined, cedula: number) => {
  if (!projectId) return
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
  const response = await ProjectModule.MemberManager.deleteMember(projectId, cedula);
  if (response.success) {
    toast.success("Miembro eliminado exitosamente")
  } else {
    toast.error(response.message)
  }
  emit("refetch")
}

const certainColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "first_name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
  },
  {
    accessorKey: "description",
    header: "Rol",
  },
  {
    accessorKey: "email",
    header: "Correo",
    cell: ({ row }) => {
      if (!row.original.email) return h('span', 'N/A')
      return h('a', { href: `mailto:${row.original.email}`, class: "hover:underline" }, row.original.email)
    }
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    id: "delete",
    accessorKey: "id",
    header: "Eliminar",
    cell: ({ row }) => {
      if (row.original.email === currentUserStore.email) {
        return null;
      }
      return h(Trash, {
        class: "cursor-pointer text-red-500", onClick: () => {
          console.log(row.original.cedula)
          deleteMember(props.projectId, row.original.cedula)
        }
      })
    }
  }
];

const columns = ref([...certainColumns])


const emit = defineEmits(["refetch"])

const table = useVueTable({
  get data() { return props.data },
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),
  state: {
  }
})

watch(() => props.allowDelete, (newVal) => {
  console.log("allowDel in Table", newVal)
  table.setColumnVisibility({
    delete: newVal
  })
  console.log(table.getIsAllColumnsVisible())
}, { immediate: true })

</script>

<template>
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
              <div class="w-full grid place-items-center">

                <LoaderCircle class="animate-spin"/>
              </div>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>