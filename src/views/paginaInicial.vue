<script setup>
import { ref } from 'vue'
const greeting = ref('Aixo es la pàgina inicial')

const dadesLlibres= ref([])
import { onBeforeMount } from 'vue'

onBeforeMount(() => {

  fetch('http://aperezh.daw.inspedralbes.cat/libros.php')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    dadesLlibres.value=data.libros
    });

  console.log(`the component is now mounted.`)
})
</script>

<template>
  <h1>Aqui vindrà un llistat de llibres</h1>
  <p class="greeting">{{ greeting }}</p>

  <div v-for="actual in dadesLlibres">
    <img height="50px" :src="actual.imagen" alt="">
    {{ actual.titulo }}
  </div>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>