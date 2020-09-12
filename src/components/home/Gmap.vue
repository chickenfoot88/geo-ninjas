<template>
  <div class="map">
    <div class="google-map" id="map" ref="map"></div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/init'

export default {
  name: 'Gmap',
  data() {
    return {
      lat: 53,
      lng: -2,
    }
  },
  async mounted() {
    this.getUserGeolocation()
  },
  methods: {
    renderMap() {
      const mapEl = this.$refs.map
      // eslint-disable-next-line no-undef, no-unused-vars
      const map = new google.maps.Map(mapEl, {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      })
    },

    async getUserGeolocation() {
      if (!navigator.geolocation) {
        this.renderMap()
        return
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          this.lat = coords.latitude
          this.lng = coords.longitude

          const currentAuthUser = await this.getUserData()
          const currentUserRef = db.collection('users')

          currentUserRef.where('user_id', '==', currentAuthUser.uid).get()
            .then((users) => {
              users.forEach(async (user) => {
                db.collection('users')
                  .doc(user.id)
                  .update({
                    geolocation: {
                      lat: this.lat,
                      lng: this.lng,
                    },
                  })
              })
            })
            .then(() => {
              this.renderMap()
            })
        },
        (error) => {
          console.error(error)
          this.renderMap()
        },
        { maximumAge: 60000, timeout: 3000 }
      )
    },

    async getUserData() {
      const user = await firebase.auth().currentUser
      return user
    },
  },
}
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  right: 0;
  left: 0;
}
</style>
