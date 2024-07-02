<script setup lang="ts">
import {moduleCaller} from "../lib/ModuleCaller/ModuleCaller"
import apiRoutes from "@/apiRoutes";
import type { CalculatorModuleType } from "../lib/ModuleTypes"
import { ref } from "vue";


const calculatorModule = moduleCaller<CalculatorModuleType>(apiRoutes.toProcess, "CalculatorModule");

const result = ref<number>(0);
const firstNumber = ref<number>(0);
const secondNumber = ref<number>(0);
const operation = ref<"+" | "-" | "*" | "/">("+");

async function calculate(operation: "+" | "-" | "*" | "/", firstNumber: number, secondNumber: number) {
    const functions = {
        "+": calculatorModule.CalculatorClass.sum,
        "-": calculatorModule.CalculatorClass.sub,
        "*": calculatorModule.CalculatorClass.mul,
        "/": calculatorModule.CalculatorClass.div
    }
    try {
        const response = await functions[operation](firstNumber, secondNumber);
        result.value = response;
    }
    catch (error) {
        console.error(error);
    }
    
}


</script>

<template>

    <div>
        <h1>Calculator</h1>
        <input type="number" v-model="firstNumber" />
        <select v-model="operation">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
        </select>
        <input type="number" v-model="secondNumber" />
        <button @click="calculate(operation, firstNumber, secondNumber)">Calculate</button>
        <p>Result: {{ result }}</p>
    </div>
    
</template>