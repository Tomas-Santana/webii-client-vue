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
import { type ProjectModuleType } from '@/lib/ModuleTypes';
import NewProjectForm from '@/components/NewProjectForm.vue';

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

const logOnServer = async () => {
    const ProjectModule = moduleCaller<ProjectModuleType>(apiRoutes.toProcess,'ProjectModule')
    await ProjectModule.ProjectManager.logSession()
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
                    <Button @click="handleLogout" variant="destructive"class="flex-1">
                        Cerrar sesión
                    </Button>
                    <NewProjectForm />
                </CardContent>
            </CardHeader>
        </Card>
    </div>
</template>