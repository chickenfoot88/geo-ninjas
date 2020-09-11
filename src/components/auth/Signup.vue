<template>
  <div class="signup container">
    <form @submit.prevent="signUp" class="card-panel">
      <h2 class="center depp-purple-text">Sign up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email"/>
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password"/>
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias"/>
      </div>
      <div class="field center">
        <button class="btn deep-purple">Sign up</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      alias: ''
    }
  },
  methods: {
    signUp() {
      
    }
  }
}
</script>
<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
</style>
