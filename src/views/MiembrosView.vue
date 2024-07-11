<script setup lang="ts">
import DataTableMembers from '@/components/DataTableMembers/DataTableMembers.vue';
import { columns as memberColumns } from '@/components/DataTableMembers/columns';
import { useRoute } from 'vue-router';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import apiRoutes from '@/apiRoutes';
import { get } from '@vueuse/core';
import { ref, watch } from 'vue';
import { type Member } from '@/lib/CustomTypes';
import AddMemberDialog from '@/components/Members/AddMemberDialog.vue';

const route = useRoute();

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");

const members = ref<Member[]>([]);

const getMembers = async () => {
  const res = await ProjectModule.MemberManager.getProjectMembers(
    parseInt(route.params.id.toString())
  );
  console.log(res);
  members.value = res.members;
}
getMembers();

watch(route, () => {
  getMembers();
});


</script>


<template>
  <div class="flex flex-col gap-4 ">

    <DataTableMembers :data="members" @refetch="getMembers()" :projectId="parseInt(route.params.id.toString())" />
    <AddMemberDialog @refetch="getMembers()" />
  </div>
</template>
