<script setup>
    const props = defineProps(['infoLlibre'])
</script>

<template>
  <div class="card" style="width: 18rem;">
          <img :src="infoLlibre.imagen"  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ infoLlibre.titulo }}</h5>
            <p class="card-text">{{infoLlibre.autor}}</p>
            <a href="#" class="btn btn-primary">Adfegir favorit</a>
          </div>
        </div>
</template>

<style>
</style>