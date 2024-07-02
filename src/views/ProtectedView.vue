<script setup lang="ts">
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import apiRoutes from '@/apiRoutes';
import { useRouter } from 'vue-router';
import { moduleCaller } from '@/lib/ModuleCaller/ModuleCaller';

const router = useRouter()
const handleLogout = async () => {
    const response = await fetch(apiRoutes.logout, {
        method: 'GET',
        credentials: 'include'
    })
    if (response.ok) {
        router.push('/login')
    } else {
        toast.error('Error al cerrar sesión')
    }
}

</script>

<template>
    <div class="grid place-items-center h-dvh w-full">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Vista protegida
                </CardTitle>
                <CardDescription>
                    Esta es una vista protegida
                </CardDescription>
                <CardContent class="flex mt-4 flex-col gap-2">
                    <Button @click="toast.success('Wuuuuuu!')" class="flex-1">
                        A celebrar
                    </Button>
                    <Button @click="handleLogout" variant="destructive"class="flex-1">
                        Cerrar sesión
                    </Button>

                </CardContent>
            </CardHeader>
        </Card>
    </div>
</template>