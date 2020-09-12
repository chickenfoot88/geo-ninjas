import Vue from 'vue'
import VueRouter from 'vue-router'
import Gmap from '../components/home/Gmap.vue'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Gmap',
    component: Gmap
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
