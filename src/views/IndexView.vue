<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <div class="w-screen h-screen flex">
        <Sidebar></Sidebar>
        <div class="bg-gray-50 flex-1 w-[calc(100%-24rem)]">
            <Navbar></Navbar>
            <div class="p-[20px]">
                <RouterView></RouterView>
            </div>
            
        </div>
    </div>
</template>
