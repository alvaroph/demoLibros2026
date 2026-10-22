<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">

  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink class="btn btn-warning" to="/">Inici</RouterLink>
        <RouterLink class="btn btn-danger" to="/favorits">Llibres favorits</RouterLink>
      </nav>
    </div>
  </header>

  
  <RouterView />
</div>
  
</template>

<style scoped>
</style>
