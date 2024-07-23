<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { UserModuleType } from '@/lib/ModuleTypes'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import apiRoutes from '@/apiRoutes'
import { useRoute } from 'vue-router'



const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres."),
  cedula: z.number({ message: "La cedula debe ser numerica" }).min(2, "La cédula debe tener al menos 2 caracteres."),

}))

const emit = defineEmits(["refetch"])

const { handleSubmit } = useForm({
  validationSchema: formSchema,

})

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const UserModule = moduleCaller<UserModuleType>(apiRoutes.toProcess,"UserModule")

  const res = await UserModule.PeopleManager.createPerson(values.firstName, values.lastName, values.cedula)

  if (res.success) {
    toast.success("Persona creada con éxito")
  } else {
    toast.error("Error al crear persona")
  }
  emit("refetch")
})
</script>

<template>
  <form class="w-full flex flex-col gap-4" @submit="onSubmit">
    <div class="flex gap-4">
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Jubert" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>Apellido</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Perez" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="cedula">
      <FormItem>
        <FormLabel>Cedula de Identidad</FormLabel>
        <FormControl>
          <Input type="number" placeholder="12345678" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Crear Persona
    </Button>
  </form>
</template>