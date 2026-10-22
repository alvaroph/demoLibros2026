<script setup>
import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'

//PINIA 1. IMPORTO L'STORE
  import { useLlibresStore } from '@/stores/llibres'
  //PINIA 2. CRISO AL STORE
  const store= useLlibresStore() 

  function eliminarFavorits(id){

    console.log("aqui anire a pinia i borrare l'actual")
  }

  function eliminarFavorit(id){
      store.eliminarFavorit(id)
    }
</script>

<template>
  <h1>Pàgina de favorits</h1>

  <div v-for="(actual,index) in store.favorits">
      <!-- Favorit {{index}} - {{actual.titulo}}
      <button @click="eliminarFavorits(index)" class="btn btn-danger">Eliminar de favorits</button>
   -->
       <fitxaLlibre  
          :infoLlibre="actual" 
          @eliminarFav="eliminarFavorit" 
          :favorit="store.esFavorit(actual.id)"/>
  </div>
</template>

<style>
</style>