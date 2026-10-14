import { createRouter, createWebHistory } from 'vue-router'


import Prova from '../views/paginaProva.vue'
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
      path: '/prova',
      name: 'prova',
      component: Prova,
    },
  ],
})

export default router
