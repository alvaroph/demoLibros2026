<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">

  <header class="d-flex align-items-center gap-3 py-3">
    <nav class="d-flex gap-2">
      <RouterLink class="btn btn-warning" to="/">Inici</RouterLink>
      <RouterLink class="btn btn-danger" to="/favorits">Llibres favorits</RouterLink>
    </nav>
  </header>

  
  <RouterView />
</div>
  
</template>

<style scoped>
</style>
