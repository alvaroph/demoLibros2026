<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>

  Aixo es un component, que es una part d'una pagina
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>