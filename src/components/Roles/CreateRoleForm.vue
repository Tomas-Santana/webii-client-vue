<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { FormItem, FormLabel } from '../ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import type { Menu } from '@/lib/CustomTypes'
import OptionsSelector from './OptionsSelector.vue'
import {Separator} from '@/components/ui/separator'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller'
import type { OptionModuleType } from '@/lib/ModuleTypes'
import apiRoutes from '@/apiRoutes'
import { toast } from 'vue-sonner'

const OptionModule = moduleCaller<OptionModuleType>(apiRoutes.toProcess, 'OptionModule')

defineProps<{
  menu: Menu[]
}>()
const emit = defineEmits(["refetch"])
const selectedOptions = ref<number[]>([])
const roleName = ref<string>('')

const handleSubmit = async () => {
  if (!roleName.value) {
    toast.error('El nombre del rol debe tener al menos 3 caracteres')
    return
  }
  if (selectedOptions.value.length === 0) {
    toast.error('Debes seleccionar al menos una opción')
    return
  }
  const res = await OptionModule.OptionManager.createProfile(
    roleName.value,
    selectedOptions.value
  )
  if (res.success) {
    emit('refetch')
    toast.success('Rol creado exitosamente')
  }
  else {
    toast.error('Error al crear el rol')
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 items-start">

    <div class="flex flex-col gap-2">
      <p class="font-medium text-sm">Nombre del Rol</p>
      <Input v-model="roleName" placeholder="SuperAdmin" />
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
      <p class="font-medium text-sm">Seleccionar opciones</p>
      <OptionsSelector :menu="menu" v-model:selectedOptions="selectedOptions" />
    </div>
    <Button @click="handleSubmit">
      Crear Rol
    </Button>
  </div>
</template>