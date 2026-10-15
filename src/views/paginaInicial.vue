<script setup>
import { ref } from 'vue'
const dadesLlibres= ref([])
import { onBeforeMount } from 'vue'
import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'
import { getLlibres } from '@/services/communicationManager'


onBeforeMount(async () => {
  //ABANS DE MUNTAR ELS COMPONENTS DEMANO LES DADES
  dadesLlibres.value = await getLlibres()
})

</script>

<template>
  <h1>Llibres favorits</h1>

  <div class="row">
  <div class="col-md-3" v-for="actual in dadesLlibres">
    
        <fitxaLlibre :infoLlibre="actual"/>
    
  </div>
</div>
</template>

