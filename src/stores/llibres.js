import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLlibresStore = defineStore('llibres', () => {
  const favorits = ref([])
  
  function afegirFavorit(fav) {
    if (!esFavorit(fav.id)) {
      favorits.value.push(fav)
    }
  }

  function esFavorit(id) {
    for (let i = 0; i < favorits.value.length; i++) {
      if (favorits.value[i].id === id) {
        return true
      }
    }
    return false
  }

  function eliminarFavorit(id) {
    for (let i = 0; i < favorits.value.length; i++) {
      if (favorits.value[i].id === id) {
        favorits.value.splice(i, 1)
        break
      }
    }
  }

  return { favorits, afegirFavorit, esFavorit, eliminarFavorit }
})
