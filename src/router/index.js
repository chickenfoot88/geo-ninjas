import Vue from 'vue'
import VueRouter from 'vue-router'
import Gmap from '../components/home/Gmap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Gmap',
    component: Gmap
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
