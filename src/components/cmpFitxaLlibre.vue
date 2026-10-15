<script setup>
    //DEFINEIXO COM EM PASSARA LA INFORMACIO EL PARE
    const props = defineProps(['infoLlibre'])
    //DEFINEIXO L'EVENT QUE PASSARE AL PARE MITJANÇANT EMITS
    //QUAN EL LLANCI AFEGIRE EL ID COM A INFORMACIO
    defineEmits(['peticioFav'])

</script>

<template>
  <div class="card" style="width: 18rem;">
          <img :src="infoLlibre.imagen"  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ infoLlibre.titulo }}</h5>
            <p class="card-text">{{infoLlibre.autor}}</p>
            <!-- Quan facin click al botó faig un emit i envio tambe l'id -->
            <a href="#" @click="$emit('peticioFav', infoLlibre.id)" 
                    class="btn btn-primary">
                    Adfegir favorit</a>
          </div>
        </div>
</template>

<style>
</style>