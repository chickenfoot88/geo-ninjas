<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email"/>
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password"/>
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Log in</button>
      </div>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      feedback: ''
    }
  },
  methods: {
    async login() {
      const isFormValid = this.validatLogin()

      if(!isFormValid) {
        this.feedback = 'Please fill in both feields'
        return
      }

      this.feedback = ''

      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.push({ name: 'Gmap' })
      } catch(error) {
        this.feedback = error.message
      }

    },
    validatLogin() {
      return this.email && this.password
    }
  }
}
</script>
<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>
