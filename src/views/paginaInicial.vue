<script setup>
import { ref } from 'vue'
const greeting = ref('Aixo es la pàgina inicial')
</script>

<template>
  <h1>Aqui vindrà un llistat de llibres</h1>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>