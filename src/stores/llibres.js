import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLlibres } from '@/services/communicationManager'


export const useLlibresStore = defineStore('llibres', () => {

  console.log('CREANT STORE LLIBRES')
  //INFORMACIÓ DE TOTS ELS LLIBRES, NO ES REACTIU, NOMES SONB DADES!!
  let dadesLlibres= []
  //LLIBRES FAVORITS
  const favorits = ref([])

  async function carregarLlibres() {
    if (dadesLlibres.length==0){
        try {
          console.log("faig un fetch")
          dadesLlibres = await getLlibres()
        } catch (error) {
          console.error('Error carregant llibres:', error)
        } finally {
          return dadesLlibres;
        }
    }
    else return dadesLlibres;
    
  }
  

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

  return {  carregarLlibres , favorits, afegirFavorit, esFavorit, eliminarFavorit }
})
