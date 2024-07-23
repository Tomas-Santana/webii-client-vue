<script setup lang="ts" >
import {type Menu, type Profile, type Role } from '@/lib/CustomTypes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next';
import apiRoutes from '@/apiRoutes';
import type { OptionModuleType } from '@/lib/ModuleTypes';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ref, watch } from 'vue';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';
import { optionsToTree } from '@/lib/optionsToTree';
import OptionsVisualizer from './OptionsVisualizer.vue';
import { toast } from 'vue-sonner';

const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, 'OptionModule');

const profileOptions = ref<Menu[]>([])
const getProfileOptions = async () => {
  const res = await OptionModule.OptionManager.getProfileOptions(
    Number(selectedRole.value)
  );
  if (res.success) {
    profileOptions.value = optionsToTree(res.data);
  }
}

const props = defineProps<{
  allowedRoles: Profile[];
  userId: number;
}>();
const open = ref(false)
const selectedRole = ref<string | undefined>()

watch(() => selectedRole.value, () => {
  if (selectedRole.value) {
    getProfileOptions()
  }
})

const handleSubmit = async () => {
  if (!selectedRole.value) {
    toast.error("Selecciona un rol")
    return
  }
  const res = await OptionModule.OptionManager.assignProfileToUser(
    props.userId,
    Number(selectedRole.value)
  )
  if (res.success) {
    toast.success("Rol asignado correctamente")
    open.value = false
  }
  else {
    toast.error("Error al asignar rol")
  }
}
  
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button class="w-full flex justify-start p-2" variant="ghost">
        <Plus class="w-4 h-4 mr-2" />
        Asignar rol
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          Agregar prelaciones
        </DialogTitle>
        <DialogDescription>
          Selecciona las actividades que deben ser completadas antes de esta actividad
        </DialogDescription>
      </DialogHeader>
      <Select
        v-model:model-value="selectedRole"
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un rol"/>
            
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="role in props.allowedRoles" :key="role.id" :value="role.id.toString()">
              {{ role.description }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <OptionsVisualizer :menu="profileOptions"
      :available-options="profileOptions"
      v-if="selectedRole" />

      <Button @click="handleSubmit" class="w-full mt-4">
        Asignar
      </Button>

    </DialogContent>
  </Dialog>
</template>