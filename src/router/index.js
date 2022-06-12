import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/peliculas',
    name: 'Peliculas',
    component: () => import('../views/Peliculas.vue')
  },
  {
    path: '/funciones',
    name: 'Funciones',
    component: () => import('../views/Funciones.vue')
  },
  {
    path: '/cartelera',
    name: 'Cartelera',
    component: () => import('../views/Cartelera.vue')
  },
  {
    path: '/pelicula',
    name: 'Pelicula',
    component: () => import('../views/Pelicula.vue')
  },
  {
    path: '/boletos',
    name: 'Boletos',
    component: () => import('../views/Boletos.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('../views/Ventas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
