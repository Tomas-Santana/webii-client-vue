<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
    <div class="grid place-items-center w-full h-dvh">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Login
                </CardTitle>
                <CardDescription>
                    Ingresa tus datos para acceder.
                </CardDescription>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </CardHeader>
        </Card>
    </div>

</template>