import type { Member } from "@/lib/CustomTypes";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from 'vue'
import { Trash } from "lucide-vue-next";
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller";
import {type ProjectModuleType } from "@/lib/ModuleTypes";
import apiRoutes from "@/apiRoutes";
import { projectsStore } from "@/stores/projectsStore";

const deleteMember = async (projectId: number | undefined, cedula:number) => {
  if (!projectId) return
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
  const response = await ProjectModule.MemberManager.deleteMember(projectId, cedula);
}

export const columns: ColumnDef<Member>[] = [
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
    cell: ({row}) => {
      if (!row.original.email) return h('span', 'N/A')
      return h('a', {href: `mailto:${row.original.email}`, class: "hover:underline"}, row.original.email)
    }
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "id",
    header: "Eliminar",
    cell: ({row}) => {
      return h(Trash, {class: "cursor-pointer text-red-500", onClick: () => {
        deleteMember(projectsStore.currentProject?.id, row.original.cedula)
      }})
    }
  }
];