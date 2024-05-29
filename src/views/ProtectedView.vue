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
                <CardContent class="flex mt-4">
                   <Button 
                   @click="toast.success('Wuuuuuu!')"
                   class="flex-1">
                        A celebrar
                   </Button>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
</template>