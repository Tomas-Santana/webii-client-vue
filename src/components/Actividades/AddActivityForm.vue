<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { Input } from '../ui/input'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toDate } from 'radix-vue/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {toast} from 'vue-sonner'
import { cn } from '@/lib/utils'
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller'
import { type ProjectModuleType } from '@/lib/ModuleTypes'
import apiRoutes from '@/apiRoutes'


const emit = defineEmits<{
  (e: 'refetch'): void
  (e: 'insert', id: number): void
}>()

const props = defineProps<{
  objectiveId: number,
  projectId: number,
}>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})


const formSchema = toTypedSchema(z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre de la actividad debe tener al menos 3 caracteres' }),
  estimatedHours: z
    .number()
    .int()
    .min(1, { message: 'Las horas estimadas deben ser al menos 1' }),
  deadline: z
    .string()
    .refine(v => v, { message: 'La fecha límite es requerida' }),
}))

const placeholder = ref()

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {

  },
})

const value = computed({
  get: () => values.deadline ? parseDate(values.deadline) : undefined,
  set: val => val,
})

const onSubmit = handleSubmit(async (values) => {
  const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess, 'ProjectModule')
  const response = await ProjectModule.ActivityManager.createActivity(
    props.objectiveId,
    values.name,
    values.deadline,
    values.estimatedHours,
  )

  if (response.success) {
    toast.success('Actividad creada')
    emit('refetch')
    emit('insert', response.id)
  }
  else {
    toast.error('Error al crear la actividad')
  }
})
</script>

<template>
  <form class="flex flex-col gap-4 " @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nombre de la actividad</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Ser el mejor" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="estimatedHours">
      <FormItem>
        <FormLabel>Horas estimadas</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="deadline">
      <FormItem class="flex flex-col">
        <FormLabel>Fecha límite</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(
                'ps-3 text-start font-normal',
                !value && 'text-muted-foreground',
              )">
                <span>{{ value ? df.format(toDate(value)) : "Escoge una fecha" }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar v-model:placeholder="placeholder" v-model="value" calendar-label="Date of birth" initial-focus
              :min-value="today(getLocalTimeZone())" :max-value="new CalendarDate(2050, 5, 6)" @update:model-value="(v) => {
                if (v) {
                  setFieldValue('deadline', v.toString())
                }
                else {
                  setFieldValue('deadline', undefined)
                }

              }" />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Crear actividad
    </Button>
  </form>
</template>