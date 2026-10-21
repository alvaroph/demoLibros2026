<script setup>
//PINIA 1. IMPORTO L'STORE
  import { useLlibresStore } from '@/stores/llibres'
  //PINIA 2. CRISO AL STORE
  const store= useLlibresStore() 

  function eliminarFavorits(id){

    console.log("aqui anire a pinia i borrare l'actual")
  }

</script>

<template>
  <h1>Pàgina de favorits</h1>

  <div v-for="(actual,index) in store.favorits">
      Favorit {{index}} - {{actual.titulo}}
      <button @click="eliminarFavorits(index)" class="btn btn-danger">Eliminar de favorits</button>
  </div>
</template>

<style>
</style>