<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { RouterLink, useRouter } from 'vue-router'

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
import { LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'

import apiRoutes from '@/apiRoutes'
import { toast } from 'vue-sonner'

const loading = ref(false)
const router = useRouter()

const registerFormSchema = toTypedSchema(z.object({
    email: z.string().email("Introduce un email válido."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    surname: z.string().min(3, "El apellido debe tener al menos 3 caracteres."),
}))

const form = useForm({
    validationSchema: registerFormSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        loading.value = true
        const response = await fetch(apiRoutes.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            router.push('/home')
        } else {
            toast.error(data.message)
        }
        
    } catch (error) {
        console.error(error)
    }
    loading.value = false
})
</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex gap-4">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Jubert" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="surname">
                <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Perez" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="hola@webii.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                    <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="loading">
            <LoaderCircle v-if="loading" class="w-4 h-4 animate-spin mr-2" />
            Submit
        </Button>
        <RouterLink to="/login" class="text-sm ml-auto hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión.
        </RouterLink>

    </form>
</template>