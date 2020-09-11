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
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Sign up</button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      alias: '',
      feedback: '',
      slug: ''
    }
  },
  methods: {
    async signUp() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })

        const usersRef = db.collection('users').doc(this.slug)
        try {
          const doc = await usersRef.get()

          if (doc.exists) {
            this.feedback = 'This alias allready exists'
          } else {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            usersRef.set({
              alias: this.alias,
              geolocation: null,
              user_id: user.uid
            })

            this.$router.push({ name: 'Gmap' })
            this.feedback = ''
          }
        } catch (error) {
          console.error(error);
          this.feedback = error.message
        }

      } else {
        this.feedback = 'You must enter all fields'
      }
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
