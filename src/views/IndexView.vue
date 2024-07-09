<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <div class="w-screen h-screen flex">
        <Sidebar></Sidebar>
        <div class="bg-gray-50 flex-1">
            <div class="p-[20px]">
                <RouterView></RouterView>
            </div>
            
        </div>
    </div>
</template>
