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
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const passwordResetschema = toTypedSchema(z.object({
    token: z.string({message: 'El token es requerido'}),
    password: z.string({message: 'La contraseña es requerida'}).min(8, {message: 'La contraseña debe tener al menos 8 caracteres'}),
    confirmPassword: z.string({message: 'La confirmación de la contraseña es requerida'}).min(8, {message: 'La confirmación de la contraseña debe tener al menos 8 caracteres'})
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
}))

const loading = ref(false)
const router = useRouter()

const form = useForm({
    validationSchema: passwordResetschema,
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        loading.value = true
        const response = await fetch(apiRoutes.passwordReset, {
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
            router.push('/login?passwordReset=true')
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
        <FormField v-slot="{ componentField }" name="token">
            <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <FormControl>
                    <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                    <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="loading">
            <LoaderCircle v-if="loading" class="w-4 h-4 animate-spin mr-2" />
            Cambiar Contraseña
        </Button>

    </form>
</template>