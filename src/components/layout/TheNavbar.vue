<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'Gmap' }" class="brand-logo left">GeoNinjas!</router-link>
        <ul class="right">
          <li><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'TheNavbar',
  data() {
    return {
      
    }
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style></style>
