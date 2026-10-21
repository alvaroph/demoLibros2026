<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'
import { getLlibres } from '@/services/communicationManager'

//PINIA 1. IMPORTO EL STORE STORES
import { useLlibresStore } from '@/stores/llibres'

//ARRAY DE LLIBRES PER MOSTRARLOS
const dadesLlibres= ref([])


onBeforeMount(async () => {
  //1. ABANS DE MUNTAR ELS COMPONENTS DEMANO LES DADES AL COMMUNICATION MANAGER
  dadesLlibres.value = await getLlibres()
})

  function afegirFav(id){
    //PINIA 2. RECUPERO EL STORE i es dira store
      const store= useLlibresStore();
      //GUARDO LA INFORMACIÓ DEL LLIBRE SELECCIONAT

      //PINIA 3. FAIG SERVIR METODES O DADES DEL STORE
      store.afegirFavorit(dadesLlibres.value[id-1])

      //La versió de sota es podria fer pero es millor fer servir mètodes
      //store.favorits.push(dadesLlibres.value[id-1])

    }
</script>

<template>
  <h1>Llibres favorits</h1>
  <div class="row">
  <div class="col-md-3" v-for="actual in dadesLlibres">
        <fitxaLlibre @peticioFav="afegirFav" :infoLlibre="actual"/>
  </div>
</div>
</template>

