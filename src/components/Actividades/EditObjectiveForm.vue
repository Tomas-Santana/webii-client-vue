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
import { toast } from 'vue-sonner'
import apiRoutes from '@/apiRoutes'
import { useRoute } from 'vue-router'
import type { ProjectTree } from '@/lib/CustomTypes'

const route = useRoute()

const props = defineProps<{
  objective: ProjectTree
}>()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
}))

const emit = defineEmits(["refetch"])

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.objective.objective_name,
  }
})

const onSubmit = handleSubmit(async (values) => {
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule")
  const response = await ProjectModule.ObjectiveManager.editObjective(
    props.objective.objective_id,
    values.name
  )
  if (response.success) {
    toast.success("Objetivo editado.")
  } else {
    toast.error("Error al editar el objetivo.")
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
      Editar objetivo
    </Button>
  </form>
</template>