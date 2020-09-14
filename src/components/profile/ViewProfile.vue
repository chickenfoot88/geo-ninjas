<template>
  <div class="view-profile container">
    <div v-if="Object.keys(profile).length" class="card">
      <h2 class="deep-purple-text center">
        {{ profile.alias }}'s Wall
      </h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/init'

export default {
  name: 'ViewProfile',
  data() {
    return {
      profile: {},
      newComment: '',
      feedback: '',
      loggedInUser: {},
      comments: []
    }
  },
  async created() {
    await this.getUserData()
    await this.getCurrentLoggedInUser()
    this.getComments()
  },
  methods: {
    async getUserData() {
      const ref = db.collection('users')
      const user = await ref.doc(this.$route.params.id).get()
      this.profile = user.data()
    },

    async addComment() {
      if (this.newComment) {
        await db.collection('comments').add({
          to: this.$route.params.id,
          from: this.loggedInUser.alias,
          content: this.newComment,
          time: Date.now()
        })

        this.newComment = ''
        this.feedback = ''
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
    },

    async getCurrentLoggedInUser() {
      const ref = db.collection('users')
      const users = await ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      users.forEach(user => {
        this.loggedInUser = user.data()
        this.loggedInUser.id = user.id
      })
    },

    getComments() {
      db
        .collection('comments')
        .where('to', '==', this.$route.params.id)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type === 'added') {
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content,
                to: change.doc.data().to
              })
            }
          })
        })
    }
  }
}
</script>
<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}

.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
