<script setup>
import { ref, watch } from 'vue'

// El pare passa les dades i indica si el llibre és favorit.
const props = defineProps(['infoLlibre', 'favorit'])
defineEmits(['peticioFav'])
const errorImatge = ref(false)

watch(function () { return props.infoLlibre.imagen }, function () {
  errorImatge.value = false
})
</script>

<template>
  <article class="card fitxa-llibre">
    <div class="zona-portada">
      <img v-if="infoLlibre.imagen && !errorImatge" :src="infoLlibre.imagen"
        :alt="'Portada de ' + infoLlibre.titulo" class="portada" loading="lazy"
        @error="errorImatge = true">
      <span v-else class="text-secondary">Portada no disponible</span>
    </div>
    <div class="card-body">
      <h2 class="card-title h5" :title="infoLlibre.titulo">{{ infoLlibre.titulo }}</h2>
      <p class="card-text autor" :title="infoLlibre.autor">{{ infoLlibre.autor }}</p>
      <!-- El fill envia l’id; el pare gestiona els favorits. -->
      <button type="button" class="btn w-100" :class="favorit ? 'btn-primary' : 'btn-outline-primary'"
        :aria-pressed="favorit ? 'true' : 'false'" @click="$emit('peticioFav', infoLlibre.id)">
        {{ favorit ? 'Treure de favorits' : 'Afegir a favorits' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.fitxa-llibre {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.zona-portada {
  height: 260px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.portada {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-title {
  height: 3.6em;
  line-height: 1.2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.autor {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
