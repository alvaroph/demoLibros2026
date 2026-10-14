import { createRouter, createWebHistory } from 'vue-router'
import paginaFavorits from '../views/paginaFavorits.vue'
import paginaInicial from '../views/paginaInicial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: paginaInicial,
    },
   
     {
      path: '/favorits',
      name: 'favorits',
      component: paginaFavorits,
    },
  ],
})

export default router
