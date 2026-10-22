<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'
import { getLlibres } from '@/services/communicationManager'

//PINIA 1. IMPORTO EL STORE STORES
import { useLlibresStore } from '@/stores/llibres'
const store= useLlibresStore();
   
//ARRAY DE LLIBRES PER MOSTRARLOS
const dadesLlibres= ref([])
const loading = ref(false)

onBeforeMount(async () => {
  //1. ABANS DE MUNTAR ELS COMPONENTS DEMANO LES DADES AL COMMUNICATION MANAGER
 //PINIA 2. RECUPERO EL STORE i es dira store
    
  try {
     loading.value=true
     dadesLlibres.value = await getLlibres()
  } catch (error) {
     console.log("error")
  } finally{
      //HAGI ANAT BE O NO, JA NO ESTEM CARREGANT
      loading.value=false
  }

})

  function afegirFavorit(id){
      //PINIA 3. FAIG SERVIR METODES O DADES DEL STORE
      store.afegirFavorit(dadesLlibres.value[id-1])
    }

    function eliminarFavorit(id){
      store.eliminarFavorit(id)
    }
</script>

<template>
  <h1>Llibres favorits</h1>
  <div v-if="loading">
    <img src="/loading.gif" alt="">
  </div>
  
  <div v-else class="row">
    <div class="col-md-3" v-for="actual in dadesLlibres">
          <fitxaLlibre 
          @afegirFav="afegirFavorit"
          @eliminarFav="eliminarFavorit" 
          :infoLlibre="actual" 
          :favorit="store.esFavorit(actual.id)"/>
    </div>
  </div>
</template>

