<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'Gmap' }" class="brand-logo left">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!isUserLoggedIn"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!isUserLoggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="isUserLoggedIn">{{ user.email }}</li>
          <li v-if="isUserLoggedIn" ><a @click="logout">Logout</a></li>
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
      isUserLoggedIn: false,
      user: {}
    }
  },
  created() {
    this.listenToUserAuthStateChange()
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
      this.$router.push({ name: 'Login' })
    },

    listenToUserAuthStateChange() {
      firebase.auth().onAuthStateChanged(user => {
        this.isUserLoggedIn = !!user
        this.user = user
      })
    }
  }
}
</script>
<style></style>
