<script setup>
import { ref } from 'vue'
const dadesLlibres= ref([])
import { onBeforeMount } from 'vue'

//Aixo es un moment determinat
// onBeforeMount(() => {
//   fetch('http://aperezh.daw.inspedralbes.cat/libros.php')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     dadesLlibres.value=data.libros
//     });
// })

onBeforeMount(async () => {
  const dades= await fetch('http://aperezh.daw.inspedralbes.cat/libros.php')
  const dades2 =  await dades.json()
  console.log(dades2)
  dadesLlibres.value=dades2.libros
})


</script>

<template>
  <h1>Llibres favorits</h1>

  <div class="row">
  <div class="col-md-3" v-for="actual in dadesLlibres">
    
        <div class="card" style="width: 18rem;">
          <img :src="actual.imagen"  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ actual.titulo }}</h5>
            <p class="card-text">{{actual.autor}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
   
    
  </div>
</div>
</template>

