<script setup>
import { ref } from 'vue'

const categoria = ref('')
const nomesFavorits = ref(false)
// Llista estàtica: els valors coincideixen amb el camp genero de l’API.
const categories = [
  'Fantasía', 'Distopía', 'Ciencia ficción', 'Fantasía juvenil',
  'Misterio juvenil', 'Thriller', 'Misterio',
  'Ficción contemporánea', 'Ficción histórica'
]
const emit = defineEmits(['canviFiltres'])

function enviarFiltres() {
  emit('canviFiltres', categoria.value, nomesFavorits.value)
}
</script>

<template>
  <section class="border rounded bg-light p-3 mb-4" aria-label="Filtres de llibres">
    <div class="row g-3 align-items-end">
      <div class="col-12 col-md-6">
        <label for="categoria-llibre" class="form-label">Categoria del llibre</label>
        <select id="categoria-llibre" class="form-select" v-model="categoria" @change="enviarFiltres">
          <option value="">Totes les categories</option>
          <option v-for="actual in categories" :key="actual" :value="actual">{{ actual }}</option>
        </select>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-check mb-md-2">
          <input id="nomes-favorits" type="checkbox" class="form-check-input"
            v-model="nomesFavorits" @change="enviarFiltres">
          <label for="nomes-favorits" class="form-check-label">Només favorits</label>
        </div>
      </div>
    </div>
  </section>
</template>
