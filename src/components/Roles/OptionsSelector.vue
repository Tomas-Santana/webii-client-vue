<script setup lang="ts">
import type { Menu, SimpleOption } from "@/lib/CustomTypes"
import { Checkbox } from "../ui/checkbox";
import { ref } from "vue";
import { defineModel } from "vue";

defineProps<{
  menu: Menu[]
}>()

const selectedOptions = defineModel<number[]>('selectedOptions', {required: true, default: []});
</script>
<template>
  <div
    class="flex flex-col gap-4 items-start"
  >
    
    
    <div v-for="menu in menu" :key="menu.id">
      <h3 class="text-md font-bold">{{ menu.name }}</h3>
      <div
        class="ml-4"
      >

        <div v-for="option in menu.options" :key="option.id"
          class="flex items-center gap-2"
        >
          <Checkbox :label="option.name" :value="option.id.toString()"
            :id="option.id.toString()"
            @update:checked="(event) => {
  
              if (selectedOptions.includes(option.id)) {
                selectedOptions = selectedOptions.filter(id => id !== option.id);
              } else {
                selectedOptions= [...selectedOptions, option.id];
              }
            }"
          />
          <label :for="option.id.toString"
            class="text-sm"
          >
            {{ option.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>