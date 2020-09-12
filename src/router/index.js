import Vue from 'vue'
import VueRouter from 'vue-router'
import Gmap from '../components/home/Gmap.vue'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Gmap',
    component: Gmap,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if (!to.matched.some(rec => rec.meta.requiresAuth)) {
    next()
  }

  const user = firebase.auth().currentUser
  user ? next() : next({ name: 'Login' })
})

export default router
