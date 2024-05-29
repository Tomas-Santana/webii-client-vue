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

const createResetFormSchema = toTypedSchema(z.object({
    email: z.string({ message: "El email es requerido" }).email("Introduce un email válido."),
}))

const loading = ref(false)
const router = useRouter()

const form = useForm({
    validationSchema: createResetFormSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        loading.value = true
        const response = await fetch(apiRoutes.createPasswordReset, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials: 'include'
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            router.push('/reset-password')
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error("Error al iniciar sesión")
        console.error(error)
    }
    loading.value = false
})
</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4 ">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="hola@webii.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="loading">
            <LoaderCircle v-if="loading" class="w-4 h-4 animate-spin mr-2" />
            Obtener código de recuperación
        </Button>

    </form>
</template>