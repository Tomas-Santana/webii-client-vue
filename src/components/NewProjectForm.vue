<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import apiRoutes from '@/apiRoutes'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { ref } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller"
import { type ProjectModuleType } from '@/lib/ModuleTypes'

const emit = defineEmits(["close"])

const newProjectFormSchema = toTypedSchema(z.object({
  name: z.string({ message: "El nombre es requerido" }).min(3, { message: "El nombre debe tener al menos 3 caracteres" }).max(50, { message: "El nombre debe tener menos de 50 caracteres" })
}))

const loading = ref(false)
const router = useRouter()

const form = useForm({
  validationSchema: newProjectFormSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
  loading.value = true
  try {
    const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule")
    const res = await ProjectModule.ProjectManager.createProject(values.name)
    toast.success(`Proyecto creado correctamente con id ${res.id}, mensaje ${res.message}`)
  } catch (error) {
    toast.error("Error al crear el proyecto")
  }
  loading.value = false
  emit("close")

})


</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 ">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nombre del proyecto</FormLabel>
        <FormControl>
          <Input  placeholder="Nuevo Proyecto" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="loading">
      <LoaderCircle v-if="loading" class="w-4 h-4 animate-spin mr-2" />
      Crear nuevo Proyecto
    </Button>

  </form>
</template>