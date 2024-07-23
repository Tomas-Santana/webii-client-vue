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
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { Textarea } from '../ui/textarea'
import { Slider } from '../ui/slider'
import { toast } from 'vue-sonner'
import { moduleCaller } from "@/lib/ModuleCaller/ModuleCaller"
import { type ProjectModuleType } from '@/lib/ModuleTypes'

const emit = defineEmits(["refetch"])

const props = defineProps<{
  currentProgress: number
  assignmentId: number
}>()

const newProjectFormSchema = toTypedSchema(z.object({

  description: z.string({ message: "La descripción es requerida" }).min(3, { message: "La descripción debe tener al menos 3 caracteres" }).max(100, { message: "La descripción debe tener menos de 100 caracteres"}),
  percentage: z.array(z.number({ message: "El porcentaje es requerido" }).min(0, { message: "El porcentaje debe ser mayor o igual a 0" }).max(100, { message: "El porcentaje debe ser menor o igual a 100" }).refine((value) => value - props.currentProgress > 0, { message: "El porcentaje no puede ser menor o igual al progreso actual del proyecto" })),
  workedHours: z.number({ message: "Las horas trabajadas son requeridas" }).min(1, { message: "Las horas trabajadas deben ser mayor o igual a 1" }).int(),
}))


const form = useForm({
  validationSchema: newProjectFormSchema,
  initialValues: {
    description: "",
    percentage: [props.currentProgress],
    workedHours: 0
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, "ProjectModule");

  const res = await ProjectModule.ProgressManager.insertUpdate(
    props.assignmentId,
    values.description,
    values.percentage[0] - props.currentProgress,
    values.workedHours
  );

  if (res.success) {
    toast.success("Avance agregado correctamente")
    emit("refetch")
    return
  }
})


</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 ">

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>
          Descripción
        </FormLabel>
        <FormControl>
          <Textarea placeholder="Describe el trabajo realizado." class="resize-none" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="workedHours">
      <FormItem>
        <FormLabel>Horas trabajadas</FormLabel>
        <FormControl>
          <Input type="number" placeholder="Nuevo Proyecto" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, value }" name="percentage">
      <FormItem>
        <FormLabel>
          Porcentaje de avance
        </FormLabel>
        <FormControl>
          <Slider v-bind="componentField" :default-value="[props.currentProgress]" :max="100" :min="0" :step="1" />
          <FormDescription class="flex justify-between">
            <span>Nuevo porcentaje de la actividad</span>
            <span>{{ value?.[0] }}%</span>
          </FormDescription>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>


    <Button type="submit">
      Agregar avance
    </Button>

  </form>
</template>