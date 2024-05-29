<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PasswordResetForm from '@/components/PasswordResetForm.vue';
</script>

<template>
    <div class="grid place-items-center w-full h-dvh">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Cambiar contraseña
                </CardTitle>
                <CardDescription>
                    Introduce tu nueva contraseña
                </CardDescription>
                <CardContent>
                    <PasswordResetForm />
                </CardContent>
            </CardHeader>
        </Card>
    </div>

</template>
