<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import apiRoutes from '@/apiRoutes';
import PeopleTable from '../PeopleTable/PeopleTable.vue';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import type { UserModuleType, ProjectModuleType } from '@/lib/ModuleTypes';
import { computed, ref, watch } from 'vue';
import type { Person, Role, Member } from '@/lib/CustomTypes';

const props = defineProps<{
  currentMembers: Member[]
}>()

const people = ref<Person[]>([])
const getPeople = async () => {
  const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess, "UserModule");
  
  const response = await UserModule.PeopleManager.getPeople();
  console.log(response)
  if (response.success) {
    people.value = response.people
  }
}
getPeople()

const allowedPeople = computed(() => {
  return people.value.filter(person => !props.currentMembers.some(member => member.cedula === person.cedula))
})

const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");

const roles = ref<Role[]>([])

const getRoles = async () => {
  const response = await ProjectModule.MemberManager.getAllRoles();
  console.log(response)
  if (response.success) {
    roles.value = response.roles.filter(role => role.description !== "NoRole")
  }
}
getRoles()

const emit = defineEmits(["refetch"])

const open = ref(false)

watch(open, (newVal) => {
  if (!newVal) {
    emit("refetch")
  }

})
const selectedRoleId = ref<string>("")
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        Nuevo Miembro
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar un nuevo miembro al proyecto</DialogTitle>
        <DialogDescription>
          Selecciona un miembro para agregar al proyecto
        </DialogDescription>
      </DialogHeader>
      <Select
        v-model="selectedRoleId"
        
      >
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Selecciona un rol para el miembro" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem v-for="role in roles" :key="role.id" :value="role.id.toString()">
              {{ role.description }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <PeopleTable :data="allowedPeople" @refetch="emit('refetch'); open=false" :roleId="Number(selectedRoleId)" />
    </DialogContent>
  </Dialog>
</template>
