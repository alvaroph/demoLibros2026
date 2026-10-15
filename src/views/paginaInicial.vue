<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'
import filtresLlibres from '@/components/cmpFiltresLlibres.vue'
import { getLlibres } from '@/services/communicationManager'

const dadesLlibres = ref([])
const categoriaSeleccionada = ref('')
const nomesFavorits = ref(false)
// Favorits temporals d’aquesta vista. Més endavant els passarem a Pinia.
const idsFavorits = ref([])
const carregant = ref(true)
const errorCarrega = ref('')

onBeforeMount(async function () {
  try {
    dadesLlibres.value = await getLlibres()
  } catch (error) {
    errorCarrega.value = 'No s’han pogut carregar els llibres. Torna-ho a provar més tard.'
  } finally {
    carregant.value = false
  }
})

function esFavorit(id) {
  for (let i = 0; i < idsFavorits.value.length; i++) {
    if (idsFavorits.value[i] === id) {
      return true
    }
  }
  return false
}

function afegirFav(id) {
  for (let i = 0; i < idsFavorits.value.length; i++) {
    if (idsFavorits.value[i] === id) {
      idsFavorits.value.splice(i, 1)
      return
    }
  }
  idsFavorits.value.push(id)
}

function canviarFiltres(categoria, favorits) {
  categoriaSeleccionada.value = categoria
  nomesFavorits.value = favorits
}

// Fem el filtratge amb un for, sense map ni filter.
const llibresFiltrats = computed(function () {
  const resultat = []
  for (let i = 0; i < dadesLlibres.value.length; i++) {
    const llibre = dadesLlibres.value[i]
    const coincideixCategoria = categoriaSeleccionada.value === '' ||
      llibre.genero === categoriaSeleccionada.value
    const coincideixFavorit = !nomesFavorits.value || esFavorit(llibre.id)
    if (coincideixCategoria && coincideixFavorit) {
      resultat.push(llibre)
    }
  }
  return resultat
})
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Cercador de llibres</h1>
    <filtresLlibres @canviFiltres="canviarFiltres" />
    <p class="text-secondary small">Els favorits són temporals: es perden en sortir d’aquesta vista o recarregar.</p>

    <p v-if="carregant" role="status">Carregant llibres…</p>
    <p v-else-if="errorCarrega" class="alert alert-danger" role="alert">{{ errorCarrega }}</p>
    <template v-else>
      <p class="text-secondary" role="status">{{ llibresFiltrats.length }} llibres trobats</p>
      <p v-if="llibresFiltrats.length === 0" class="alert alert-info">
        No hi ha llibres amb aquests filtres.
      </p>
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-lg-3" v-for="actual in llibresFiltrats" :key="actual.id">
          <fitxaLlibre :infoLlibre="actual" :favorit="esFavorit(actual.id)" @peticioFav="afegirFav" />
        </div>
      </div>
    </template>
  </main>
</template>
