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
import type { Member } from "@/lib/CustomTypes";
import { h } from 'vue'
import { Trash } from "lucide-vue-next";
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller";
import { type ProjectModuleType } from "@/lib/ModuleTypes";
import apiRoutes from "@/apiRoutes";
import { projectsStore } from "@/stores/projectsStore";
import { toast } from 'vue-sonner';

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

const columns: ColumnDef<Member>[] = [
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
    accessorKey: "id",
    header: "Eliminar",
    cell: ({ row }) => {
      return h(Trash, {
        class: "cursor-pointer text-red-500", onClick: () => {
          console.log(row.original.cedula)
          deleteMember(props.projectId, row.original.cedula)
        }
      })
    }
  }
];

const props = defineProps<{
  data: Member[]
  projectId: number
}>()

const emit = defineEmits(["refetch"])

const table = useVueTable({
  get data() { return props.data },
  columns: columns,
  getCoreRowModel: getCoreRowModel(),
})

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
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>