import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLlibresStore = defineStore('llibres', () => {
  const favorits = ref([])
  function afegirFavorit(fav){
    favorits.value.push(fav);
  }

  return { favorits, afegirFavorit }
})
