<script setup>
    //DEFINEIXO COM EM PASSARA LA INFORMACIO EL PARE
    const props = defineProps(['infoLlibre','favorit'])

    //DEFINEIXO L'EVENT QUE PASSARE AL PARE MITJANÇANT EMITS
    //QUAN EL LLANCI AFEGIRE EL ID COM A INFORMACIO
    const emit=defineEmits(['afegirFav','eliminarFav'])

</script>

<template>
  <div class="card" style="width: 18rem;">
          <img :src="infoLlibre.imagen"  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ infoLlibre.titulo }}</h5>
            <p class="card-text">{{infoLlibre.autor}}</p>
            <h4><span class="badge text-bg-secondary">{{infoLlibre.genero}}</span></h4>
            <!-- Quan facin click al botó faig un emit i envio tambe l'id -->

            <button v-if="!favorit" @click="emit('afegirFav', infoLlibre.id)" 
                    class="btn btn-primary">
                    Afegir favorit</button>
             <button v-if="favorit" @click="emit('eliminarFav', infoLlibre.id)" 
                    class="btn btn-danger">
                    Eliminar favorit</button>
          </div>
        </div>
</template>

<style>
</style>