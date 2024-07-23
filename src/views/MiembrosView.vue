<script setup lang="ts">
import DataTableMembers from '@/components/DataTableMembers/DataTableMembers.vue';
import { columns as memberColumns } from '@/components/DataTableMembers/columns';
import { useRoute } from 'vue-router';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { ProjectModuleType, OptionModuleType } from '@/lib/ModuleTypes';
import { useProjectMenuOptions } from '@/lib/useMenuOptions';
import apiRoutes from '@/apiRoutes';
import { computed, ref, watch } from 'vue';
import { type Member } from '@/lib/CustomTypes';
import AddMemberDialog from '@/components/Members/AddMemberDialog.vue';
import { toast } from 'vue-sonner';
import { type ViewOptions } from '@/lib/MenuOptions';
import { projectsStore } from '@/stores/projectsStore';

const route = useRoute();
const {options: avOptions} = useProjectMenuOptions<ViewOptions["MembersView"]>("MembersView", parseInt(route.params.id.toString()));

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");
const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, "OptionModule");

const members = ref<Member[]>([]);

const getMembers = async () => {
  const res = await ProjectModule.MemberManager.getProjectMembers(
    parseInt(route.params.id.toString())
  );
  console.log(res);
  members.value = res.members;
}
getMembers();


const allowDelete = computed(() => !!avOptions.value?.includes('DeleteMember'));


watch(route, () => {
  getMembers();
});


</script>


<template>
  <div class="flex flex-col gap-4 max-w-3xl">
    <h1 class="text-5xl">
      <span class="font-bold">
        Miembros -
      </span>
      {{ projectsStore.currentProject?.name }}
    </h1>

    <DataTableMembers :data="members" @refetch="getMembers()" :projectId="parseInt(route.params.id.toString())"
      :allowDelete="allowDelete" />
    <AddMemberDialog @refetch="getMembers()" v-if="avOptions?.includes('AddMember')" :currentMembers="members" />
  </div>
</template>
