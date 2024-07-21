<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { ProjectModuleType } from '@/lib/ModuleTypes'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {toast} from 'vue-sonner'
import apiRoutes from '@/apiRoutes'
import { useRoute } from 'vue-router'

const route = useRoute()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
}))

const emit = defineEmits(["refetch"])

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule")
  const response = await ProjectModule.ObjectiveManager.insertObjective(
    parseInt(route.params.id.toString()),
    values.name
  )
  if (response.success) {
    toast.success("Objetivo creado exitosamente")
  } else {
    toast.error(response.message)
  }
  emit("refetch")
})
</script>

<template>
  <form class="w-full space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nombre del Objetivo</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Ganar con garra" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          El nombre del objetivo debe ser descriptivo y conciso.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Crear Objetivo
    </Button>
  </form>
</template>